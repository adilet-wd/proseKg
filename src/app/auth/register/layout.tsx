import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
