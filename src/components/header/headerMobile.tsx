"use client";
import * as React from "react";
import styles from "./header.module.scss";
import {
  Button,
  Container,
  Nav,
  NavLink,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import Link from "next/link";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { AuthContext } from "@/app/auth/authContext";
import { useContext } from "react";
import Image from "next/image";

import myProfileIcon from "@/assets/icons/my-profile.svg";

export default function HeaderMobile() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <>
      <header className="header header-mobile">
        <Navbar fixed="top" collapseOnSelect expand="md">
          <Container className="header-container">
            <Navbar.Brand
              className={`${(styles.logo, styles.logoMobile)} `}
              href="/">
              ProseKg
            </Navbar.Brand>
            <div className="header-mobile__links">
              <Link
                href="/library"
                className={`${styles.button} library nav-link`}>
                Библиотека
              </Link>
            </div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="start">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  ProseKG
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link onClick={closeCanvas} href="/" className="nav-link">
                    Главная
                  </Link>
                  <Link
                    onClick={closeCanvas}
                    href="/library"
                    className="nav-link">
                    Библиотека
                  </Link>
                  {isAuthenticated ? (
                    <Link
                      onClick={closeCanvas}
                      href="/myProfile"
                      className="nav-link">
                      Личный кабинет
                    </Link>
                  ) : (
                    <Link
                      onClick={closeCanvas}
                      href="/auth/login"
                      className={`${styles.button} nav-link`}>
                      Войти
                    </Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

// Helper functions
function closeCanvas() {
  window.scrollTo(0, 0);
  const navbarToggler = document.querySelector(
    ".navbar-toggler"
  ) as HTMLElement;
  if (navbarToggler && !navbarToggler.classList.contains("collapsed")) {
    navbarToggler.click();
  }
}
