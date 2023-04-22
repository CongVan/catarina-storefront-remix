import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import axios from "axios";
import jwt from "jsonwebtoken";

import { getCommitUserSessionHeader } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data: dataToken } = await axios
    .post(process.env.WOO_HOST + "/wp-json/jwt-auth/v1/token", {
      username: email,
      password: password,
    })
    .catch((e) => e.response);

  const token = dataToken.token;
  if (!token) {
    return json(
      {
        error: "Email hoặc Password không chính xác",
      },
      { status: 400 }
    );
  }
  var decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);

  if (!decoded?.data?.user?.id) {
    return json(
      {
        error: "Đăng nhập thất bại. Vui lòng thử lại sau",
      },
      { status: 400 }
    );
  }
  const userId = decoded?.data?.user?.id;

  return json(
    {
      error: "",
      success: true,
    },
    {
      headers: {
        ...(await getCommitUserSessionHeader({ request, userId })),
      },
    }
  );
}
