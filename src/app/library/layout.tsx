import Header from '@/components/header/header';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div className="nav-placeholder"></div>
            <Header></Header>
            <main>
                {children}
            </main>
            <footer>
                {/* Your footer content */}
            </footer>
        </div>
    );
};

export default Layout;