import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ params, request }: LoaderArgs) => {
  console.log("params", params);

  if (!process.env.WOO_API) {
    return new Response("Woo API set net", { status: 500 });
  }

  const url = new URL(request.url);

  const pathname = url.pathname.replace(/^\/api/gis, "");

  const headers = new Headers({
    ...request.headers,
    Authorization: `Basic ${Buffer.from(
      `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
    ).toString("base64")}`,
  });
  const _url = process.env.WOO_API + pathname + url.search;
  console.log("api api", _url);

  console.time(_url);
  const response = await fetch(_url, { headers });
  console.timeEnd(_url);

  return response;
};
