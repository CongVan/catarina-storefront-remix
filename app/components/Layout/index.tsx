import { Outlet } from "@remix-run/react";
import { Footer } from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
import { LoginModal } from "~/components/Layout/LoginModal";
import { RegisterModal } from "~/components/Layout/RegisterModal";

export const Layout = () => {
  console.log("layout render");

  return (
    <>
      <Header />
      <main className="mt-5">
        <Outlet />
      </main>
      <LoginModal />
      <RegisterModal />
      <Footer />
    </>
  );
};
