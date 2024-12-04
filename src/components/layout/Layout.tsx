import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import NavBar from "../custom/Navbar";
import Footer from "../custom/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth();

  const noLayoutRoutes = ["/login", "/register"];

  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname);

  useEffect(() => {
    if (!user.user && !isNoLayoutRoute) {
      navigate("/login");
    }
  }, [user, isNoLayoutRoute, navigate]);

  if (isNoLayoutRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <main className="p-4 w-full flex justify-center">
        <div className="w-[90%] xl:max-w-[1140px] xl:w-full">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
