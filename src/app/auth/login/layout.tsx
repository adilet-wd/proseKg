import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="nav-placeholder"></div>
      <Header></Header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
