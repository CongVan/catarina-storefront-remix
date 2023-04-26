import { Outlet } from "@remix-run/react";
import React from "react";
import { Footer } from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
import { LoginModal } from "~/components/Layout/LoginModal";
import { RegisterModal } from "~/components/Layout/RegisterModal";

export const Layout = React.memo(function () {
  console.log("layout render");

  return (
    <>
      <Header />
      <main className="mt-2">
        <Outlet />
      </main>
      <LoginModal />
      <RegisterModal />
      <Footer />
    </>
  );
});
Layout.displayName = "Layout";
