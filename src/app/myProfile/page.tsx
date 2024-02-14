'use client'
import { Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/authContext";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: number;
  password: string;
  last_login: null;
  link: string;
  is_superuser: false,
  first_name: string,
  last_name: string,
  is_staff: false,
  is_active: true,
  date_joined: string,
  name: string,
  surename: string,
  username: string,
  email: string,
  avatar: null,
  created_at: string,
  confirmation_code: string,
  groups: [],
  user_permissions: []
}

export default function MyProfile() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const [isClient, setIsClient] = useState(false);
  const { refreshToken, setRefreshToken } = authContext || {};
  const { accessToken, setAccessToken } = authContext || {};
  const { user, setUser} = useState<User>();
  const router = useRouter();

  // Проверка на клиента
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Редирект на страницу Профиля, если пользователь уже вошел
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(isClient && refreshToken) {
      getProfile();
    }
  }, [isClient, refreshToken]);


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

  async function getProfile() {
    try {
      console.log(refreshToken);
      const newAccessToken = await axios.post(
        `${process.env.API_ROUTE}/regauth/refresh-token/`,
        {
          refresh: refreshToken,
        }
      );
      setAccessToken(newAccessToken.data.access);
      console.log(newAccessToken.data.access);
      const res = await axios.post(`${process.env.API_ROUTE}/regauth/user-profile/`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      );
      setUser(res.data);

    } catch (error) {
      if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  if (!isClient) {
    return (
      <main>
        <Container>
          <LoadingScreen></LoadingScreen>
        </Container>
      </main>
    
    );
  }

  return (
    <main>
        <Container>
            <h2>Здесь будет страница с личным кабинетом</h2>
            <p>{isAuthenticated ? 'Пользователь вошел' : 'Пользователь не вошел'}</p>
            <p>{user?.username}</p>
            <button onClick={logout}>Выйти</button>
            <button onClick={login}> Войти</button>
        </Container>
    </main>
  );
}