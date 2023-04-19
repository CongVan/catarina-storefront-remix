import { Await, Outlet, useLoaderData } from "@remix-run/react";
import React, { Suspense } from "react";
import Header from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";

export const Layout = () => {
  const { promise } = useLoaderData();

  return (
    <Suspense fallback={<>Loading....</>}>
      <Await resolve={promise}>
        {(s) => (
          <>
            <Header />
            <main className="mt-5">
              <Outlet />
            </main>
            <Footer />
          </>
        )}
      </Await>
    </Suspense>
  );
};
