'use client'
import * as React from 'react';
import styles from './header.module.scss';
import { Container, Nav, NavLink, Navbar, } from 'react-bootstrap';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/auth/authContext';
import LoadingScreen from '../loadingScreen/loadingScreen';


export default function HeaderDesktop() {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, setIsAuthenticated } = authContext || {};
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return (
        <LoadingScreen></LoadingScreen>
      ); 
    }
    
    return (
    <>
            <header className="header header-desktop">
                
                <Navbar fixed="top" collapseOnSelect expand="md" >
                    <Container>
                        {/* Лого */}
                        <Navbar.Brand className={styles.logo} href="/">
                            ProseKg
                        </Navbar.Brand>
                        
                        <Nav className='mr-auto'>
                            <Link href="/" className="nav-link">Главная</Link>
                            <Link href="/library" className="nav-link">Библиотека</Link>
                            {isAuthenticated ? <Link href="/myProfile" className="nav-link">Личный кабинет</Link> : <Link href="/auth/register" className={`${styles.button} nav-link`}>Зарегистрироваться</Link>}
                            {isAuthenticated ? null : <Link href="/auth/login" className={`${styles.button} nav-link`}>Войти</Link>}
                        </Nav>
                    </Container>
                </Navbar>
            </header>


        </>
  );
}

// Helper functions
function getExclamationMarks(numChars: number) {
  
}