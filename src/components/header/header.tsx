'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import { useRouter } from 'next/router';

export interface Props {
}


export default function Header() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (windowWidth && windowWidth > 768) {
        return <HeaderDesktop />;
    } else if (windowWidth && windowWidth > 0) {
        return <HeaderMobile />;
    }
}

// Helper functions
function getExclamationMarks(numChars: number) {
  
}