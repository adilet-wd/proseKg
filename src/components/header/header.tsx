'use client'
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import { useRouter } from 'next/router';
import LoadingScreen from '../loadingScreens/loadingScreen';
import HeaderLoadingScreen from '../loadingScreens/headerLoadingScreen';
import { AuthContext } from '@/app/auth/authContext';

export interface Props {
}


export default function Header() {
    const [windowWidth, setWindowWidth] = useState(0);
    const authContext = useContext(AuthContext);
    const { isAuthenticated, setIsAuthenticated } = authContext || {};
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

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

    // if (!isClient) {
    //     return <LoadingScreen></LoadingScreen>;
    // }

    if (windowWidth && windowWidth >= 768) {
        return <HeaderDesktop />;
    } else if (windowWidth && windowWidth > 0) {
        return <HeaderMobile />;
    }
    return <HeaderLoadingScreen/>;
}

// Helper functions
function getExclamationMarks(numChars: number) {
  
}