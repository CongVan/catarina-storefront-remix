import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { CommerceAPI } from "~/modules/api/commerce";
import { getCommitUserSessionHeader, getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data, error } = await CommerceAPI.customers.create({
      email,
      username: email,
      password,
    });

    if (error || !data?.id) {
      if (error?.code === "registration-error-email-exists")
        return json({ error: "Email đã được đăng ký" }, { status: 400 });
      return json({ error: error.message }, { status: 400 });
    }

    return json(
      {
        error: "",
        success: true,
      },
      {
        headers: {
          ...(await getCommitUserSessionHeader({ request, userId: data.id })),
        },
      }
    );
  } catch (error: any) {
    return json({ error: error?.message }, { status: 400 });
  }
}
