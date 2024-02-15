'use client'
import { Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/authContext";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";
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
  const [user, setUser] = useState<User>();
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
  }, [isAuthenticated, router]);

  // Получение профиля пользователя при загрузке страницы
  useEffect(() => {
    if(isClient && refreshToken) {
      getProfile();
    }
    // getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, refreshToken, router]);

  async function logoutFromServer(){
    const isDeleted = await deleteToken();
    if (isDeleted && setIsAuthenticated && setAccessToken && setRefreshToken) {
      setIsAuthenticated(false);
      setAccessToken('');
      setRefreshToken('');
      console.log("Пользователь вышел", isDeleted);
    }
  }

  async function logoutFromClient() {
    if(setAccessToken && setRefreshToken && setIsAuthenticated){
      setAccessToken('');
      setRefreshToken('');
      setIsAuthenticated(false);
      console.log("Пользователь вышел из системы");
    }
  }

  // Функция для получения данных о пользователе с сервера
  async function getProfile() {
    try {
      const newAccessToken = await axios.post(
        `${process.env.API_ROUTE}/regauth/refresh-token/`,
        {
          refresh: refreshToken,
        }
      );
      console.log(newAccessToken);
      if (setAccessToken) {
        setAccessToken(newAccessToken.data.access);
        const res = await axios.get(`${process.env.API_ROUTE}/regauth/user-profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUser(res.data);
      }
    } catch (error) {
      // Если токен просрочился, то возвращает на главную и выходит из сайта
      if ((error as any)?.response?.status === 401) {
        logoutFromClient();
        router.push('/');
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }
  async function deleteToken() {
    try {
      const res = await axios.post(
        `${process.env.API_ROUTE}/regauth/logout/`,
        {
          refresh: refreshToken,
        }
      );
      if (res.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(`Ошибка`, error);
      return false;
    }
  }
  // Загрузочный экран
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
            <button onClick={logoutFromServer}>Выйти</button>
        </Container>
    </main>
  );
}