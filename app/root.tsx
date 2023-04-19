import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { defer } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "~/context/theme";

import stylesheet from "~/styles/tailwind.css";
import type { Category } from "~/types/product-category";
import type { User } from "~/types/user";
import { $fetch } from "~/utils/api";
import { Layout } from "./components/Layout";
import { getUser, getUserId } from "./session.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesheet },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  let user: User | null = null;
  const { data: categories } = await $fetch<Category[]>(
    "/products/categories",
    {
      params: { orderby: "count", hide_empty: true },
      init: {
        cache: "force-cache",
      },
    }
  );

  if (userId) {
    const { data } = await $fetch<User>("/customers/" + userId);
    user = data;
  }

  return json({
    categories,
    user,
    ENV: {
      SITE_URL: process.env.SITE_URL,
    },
  });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <ThemeProvider>
            <Layout />
          </ThemeProvider>
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </QueryClientProvider>
  );
}
