import { Outlet } from "@remix-run/react";
import React from "react";
import { Footer } from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
import { LoginModal } from "~/components/Layout/LoginModal";
import { RegisterModal } from "~/components/Layout/RegisterModal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Breadcrumbs } from "~/components/Breadcrumbs";
dayjs.extend(utc);
export const Layout = React.memo(function () {
  console.log("layout render");

  return (
    <>
      <Header />
      <main className="mb-32 mt-2 grow">
        <Breadcrumbs />

        <Outlet />
      </main>
      <LoginModal />
      <RegisterModal />
      <Footer />
    </>
  );
});
Layout.displayName = "Layout";
