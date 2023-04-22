import type {
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/node";
const ORIGIN = process.env.WOO_API;

const proxyRequest = (request: Request) => {
  const { pathname, search } = new URL(request.url);
  const proxyPathname = pathname.replace(/^\/api/gis, "");
  const href = ORIGIN + proxyPathname + search;
  const headers = new Headers({
    ...request.headers,
    Authorization: `Basic ${Buffer.from(
      `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
    ).toString("base64")}`,
  });

  const req = new Request(href, request);
  // req.headers.append(
  //   "Authorization",
  //   `Basic ${Buffer.from(
  //     `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
  //   ).toString("base64")}`
  // );
  return req;
};

export const loader: LoaderFunction = async ({ request }) =>
  fetch(proxyRequest(request));

export const action: ActionFunction = ({ request }) =>
  fetch(proxyRequest(request));
// export const loader = async ({ params, request }: LoaderArgs) => {
//   if (!process.env.WOO_API) {
//     return new Response("Woo API set net", { status: 500 });
//   }

//   const url = new URL(request.url);

//   const pathname = url.pathname.replace(/^\/api/gis, "");

//   const headers = new Headers({
//     ...request.headers,
//     Authorization: `Basic ${Buffer.from(
//       `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
//     ).toString("base64")}`,
//   });
//   const _url = process.env.WOO_API + pathname + url.search;

//   const response = await fetch(_url, {
//     headers,
//   });

//   return response;
// };

// export const action = async ({ params, request, context }: LoaderArgs) => {
//   if (!process.env.WOO_API) {
//     return new Response("Woo API set net", { status: 500 });
//   }
//   const url = new URL(request.url);

//   const pathname = url.pathname.replace(/^\/api/gis, "");

//   const headers = new Headers({
//     "Content-Type": request.headers.get("Content-Type") || "application/json",
//     Authorization: `Basic ${Buffer.from(
//       `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
//     ).toString("base64")}`,
//   });
//   const _url = process.env.WOO_API + pathname + url.search;

//   const response = await fetch(_url, {
//     headers,
//     method: request.method,
//     body:
//       headers.get("Content-Type") === "application/json"
//         ? await request.json()
//         : request.body,
//   });

//   return response;
// };
