'use client'
import { Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/authContext";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";



export default function MyProfile() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const [isClient, setIsClient] = useState(false);
  
  function login() {
    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }
  }

  function logout(){
    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <main>
        <Container>
          <LoadingScreen></LoadingScreen>
        </Container>
      </main>
    
    ); // или другой "нейтральный" контент
  }

  return (
    <main>
        <Container>
            <h2>Здесь будет страница с личным кабинетом</h2>
            <p>{isAuthenticated ? 'Пользователь вошел' : 'Пользователь не вошел'}</p>
            <button onClick={logout}>Выйти</button>
            <button onClick={login}> Войти</button>
        </Container>
    </main>
  );
}