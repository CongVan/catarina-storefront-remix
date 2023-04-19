import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";
import { $fetch } from "~/utils/api";
import type { User } from "~/types/user";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  console.log("username", email);
  console.log("password", password);

  if (!process.env.WOO_API) {
    return new Response("Woo API set net", { status: 500 });
  }

  const headers = new Headers({
    ...request.headers,
    Authorization: `Basic ${Buffer.from(
      `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
    ).toString("base64")}`,
  });

  const response = await fetch(process.env.WOO_API + "/customers", {
    body: formData,
    method: "POST",
    headers: headers,
  });
  const user = (await response.json()) as any;
  console.log("user", user);

  if (!user.id) {
    return json({ ...user }, { status: 400 });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo,
  });
}
