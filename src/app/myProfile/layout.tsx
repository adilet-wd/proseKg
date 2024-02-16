import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="nav-placeholder"></div>
            <Header></Header>
            <main>
                {children}
            </main>
            <Footer></Footer>
        </>
    );
};

export default Layout;