import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
