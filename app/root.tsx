import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "~/context/theme";
import { CommerceAPI } from "~/modules/api/commerce";

import tailwind from "~/styles/tailwind.css";
import globalStyle from "~/styles/index.css";
import type { Customer } from "~/types/user";
import { Layout } from "./components/Layout";
import { getUserId } from "./session.server";
import { CartProvider } from "~/components/Cart/CartProvider";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwind },
    { rel: "stylesheet", href: globalStyle },
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

const fetchCustomer = async (request: Request) => {
  const userId = await getUserId(request);
  let user: Customer | null = null;
  if (userId) {
    const { data } = await CommerceAPI.customers.detail(userId);
    user = data;
  }
  return user;
};

export async function loader({ request }: LoaderArgs) {
  const { data: categories } = await CommerceAPI.productCategories.list({
    params: {
      orderby: "count",
      hide_empty: true,
    },
  });

  const user = await fetchCustomer(request);

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
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <ThemeProvider>
            <CartProvider customer={data.user as Customer}>
              <Layout />
            </CartProvider>
          </ThemeProvider>
          <ScrollRestoration />

          <Toaster
            toastOptions={{
              duration: 3000,
              className: "font-semibold leading-relaxed tracking-wide",
            }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </QueryClientProvider>
  );
}
