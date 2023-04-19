import { Await, Outlet, useLoaderData } from "@remix-run/react";
import React, { Suspense } from "react";
import Header from "~/components/Layout/Header";
import { Footer } from "~/components/Layout/Footer";
import { LoginModal } from "~/components/Layout/LoginModal";
import { RegisterModal } from "~/components/Layout/RegisterModal";

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
            <LoginModal />
            <RegisterModal />
            <Footer />
          </>
        )}
      </Await>
    </Suspense>
  );
};
