import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { defer } from "@remix-run/node";
import {
  Await,
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "~/hooks/use-theme";
import { CommerceAPI } from "~/modules/api/commerce";

import { Suspense } from "react";
import { AppProvider } from "~/hooks/use-app";
import { CartProvider } from "~/hooks/use-cart";
import { AuthProvider } from "~/hooks/user-auth";
import globalStyle from "~/styles/index.css";
import tailwind from "~/styles/tailwind-base.css";
import type { Customer } from "~/types/user";
import { Layout } from "./components/Layout";
import { getUserId } from "./session.server";
import { metaDescription, metaTitle } from "~/utils/helper";

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
  const categoriesPromise = CommerceAPI.productCategories.list({
    params: {
      orderby: "count",
      hide_empty: true,
    },
  });

  const userPromises = fetchCustomer(request);

  return defer({
    promises: Promise.all([userPromises, categoriesPromise]),
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
  const { ENV, promises } = useLoaderData<typeof loader>();

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="vi">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`,
            }}
          />
          <Suspense fallback={<>Loading...</>}>
            <Await resolve={promises}>
              {([customer, categoriesData]) => (
                <>
                  <AppProvider categories={categoriesData.data} env={ENV}>
                    <AuthProvider customer={customer}>
                      <ThemeProvider>
                        <CartProvider customer={customer as Customer}>
                          <Layout />
                        </CartProvider>
                      </ThemeProvider>
                    </AuthProvider>
                  </AppProvider>
                </>
              )}
            </Await>
          </Suspense>

          <ScrollRestoration />

          <Toaster
            toastOptions={{
              duration: 3000,
              className: "font-semibold leading-relaxed tracking-wide",
            }}
          />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  );
}

export const handle = {
  breadcrumb: { title: "Trang chủ" },
};

export const meta: V2_MetaFunction<typeof loader> = () => {
  return [
    {
      title: metaTitle(),
    },
    {
      property: "description",

      content: metaDescription(),
    },
    {
      property: "viewport",

      content: "width=device-width,initial-scale=1",
    },
  ];
};
