import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import jwt from "jsonwebtoken";

import { createUserSession } from "~/session.server";
import { safeRedirect } from "~/utils";

// export async function loader({ request }: LoaderArgs) {
//   const userId = await getUserId(request);
//   if (userId) return redirect("/");
//   return json({});
// }

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!process.env.WOO_API) {
    return new Response("Woo API set net", { status: 500 });
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    // Authorization: `Basic ${Buffer.from(
    //   `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
    // ).toString("base64")}`,
  });

  const response = await fetch(
    process.env.WOO_HOST + "/wp-json/jwt-auth/v1/token",
    {
      body: JSON.stringify({
        username: email,
        password,
      }),
      method: "POST",
      headers: headers,
    }
  );
  const dataToken = (await response.json()) as any;
  console.log("login", dataToken);

  const token = dataToken.token;
  if (!token) {
    return json(
      {
        error: "email/password không đúng",
      },
      { status: 400 }
    );
  }
  var decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
  console.log("decoded", decoded);
  if (!decoded?.data?.user?.id) {
    return json(
      {
        error: "email/password không đúng",
      },
      { status: 400 }
    );
  }
  const userId = decoded?.data?.user?.id;

  return createUserSession({
    request,
    userId: userId,
    remember: true,
    redirectTo,
  });
}
