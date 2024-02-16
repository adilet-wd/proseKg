'use client'
import { Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/authContext";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

import profileIconBlue from "../../assets/icons/my-profile.svg";
import profileIconOrange from "../../assets/icons/my-profileOrange.svg";
import bookmarkIconBlue from "../../assets/icons/bookmark-regular.svg";
import bookmarkIconOrange from "../../assets/icons/bookmark-regularOrange.svg";
import Link from "next/link";



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
  surname: string,
  username: string,
  email: string,
  avatar: null,
  created_at: string,
  confirmation_code: string,
  groups: [],
  user_permissions: []
}

interface Favorite {
  pic: string;
  name: string;
  short: string;
  link: string;
  author: {
    id: number;
    pic: string;
    fullname: string;
    bio: string;
    link: string;
  };
  genre: {
    id: number;
    name: string;
    link: string;
  };
  audio: string;
}

interface Favorites {
  favorites: Favorite[];
}

export default function MyProfile() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const { refreshToken, setRefreshToken } = authContext || {};
  const { accessToken, setAccessToken } = authContext || {};
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkIconBlue);
  const [profileIcon, setProfileIcon] = useState(profileIconBlue);
  const [favorites, setFavorites] = useState<Favorite[]>([]);;

  const [windowWidth, setWindowWidth] = useState(0);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');

  async function logoutFromServer(){
    const isDeleted = await deleteToken();
    if (isDeleted && setIsAuthenticated && setAccessToken && setRefreshToken) {
      setIsAuthenticated(false);
      setAccessToken('');
      setRefreshToken('');
    }
  }

  async function logoutFromClient() {
    if(setAccessToken && setRefreshToken && setIsAuthenticated){
      setAccessToken('');
      setRefreshToken('');
      setIsAuthenticated(false);
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
      console.log(newAccessToken.data.access);
      if (setAccessToken) {
        setAccessToken(newAccessToken.data.access);
        const res = await axios.get(`${process.env.API_ROUTE}/regauth/user-profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUser(res.data);
        console.log(res.data);
      }
    } catch (error) {
      // Если токен просрочился, то возвращает на главную и выходит из сайта
      if ((error as any)?.response?.status === 401) {
        logoutFromClient();
        router.push('/');
      } else {
        // console.log(`Ошибка`, error);
      }
    }
  }

  async function getFavorites() {
    try {
      const newAccessToken = await axios.post(
        `${process.env.API_ROUTE}/regauth/refresh-token/`,
        {
          refresh: refreshToken,
        }
      );
      if (setAccessToken) {
        setAccessToken(newAccessToken.data.access);
        const res = await axios.get(`${process.env.API_ROUTE}/content/my_favorites/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setFavorites(res.data);
        console.log(res.data);
      }
    } catch (error) {
      // Если токен просрочился, то возвращает на главную и выходит из сайта
      if ((error as any)?.response?.status === 401) {
        logoutFromClient();
        router.push('/');
      } else {
        // console.log(`Ошибка`, error);
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
      return false;
    }
  }

  // хэш URL при изменении вкладки
  function handleTabChange(tab: string) {
    if(tab === "favorites"){
      setBookmarkIcon(bookmarkIconOrange);
      setProfileIcon(profileIconBlue);
    } else {
      setBookmarkIcon(bookmarkIconBlue);
      setProfileIcon(profileIconOrange);
    }
    setActiveTab(tab);
    window.location.hash = tab;
  };

  // Обновление состояния вкладок при изменении хэша
  useEffect(() => {
    window.onhashchange = () => {
      setActiveTab(window.location.hash.substring(1));
    };
  }, []);

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

  // Редирект на главную страницу, если пользователь не вошел
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated, router]);

  // Получение профиля пользователя при загрузке страницы
  useEffect(() => {
    if(windowWidth > 0 && refreshToken) {
      getProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, refreshToken, router]);

  if (user && windowWidth > 0) {
    return (
      <main>
          <Container className={"myProfile-container"}>
              <div className={"myProfile"}>
                <div className={"myProfile-left"}>
                  <button 
                    className={[activeTab === 'info' ? 'active' : '', "myProfile-left__button"].join(' ')}
                    onClick={() => handleTabChange('info')}>
                    <Image src={profileIcon} alt="" width={20} height={20}></Image>Профиль
                  </button>
                  <button 
                    className={[activeTab === 'favorites' ? 'active' : '', "myProfile-left__button"].join(' ')}
                    onClick={() => handleTabChange('favorites')}>
                    <Image src={bookmarkIcon} alt="" width={20} height={20}></Image>Чөп каттар
                  </button>
                </div>
                <div className={"myProfile-right"}>
                  {activeTab === 'info' && <>
                    <div className={"myProfile-right__info"}>
                      <div className={"myProfile-right__info-title"}>
                        Өздүк маалымат
                      </div>
                      <table className={"myProfile-right__info-inputs"}>
                          <tbody>
                            <tr className={"myProfile-right__info-input"}>
                              <td className="myProfile-right__info-column1">Атыңыз</td>
                              <td className="myProfile-right__info-column2">
                                <input type="text" value={user?.name} readOnly></input>
                              </td>
                            </tr>
                            <tr className={"myProfile-right__info-input"}>
                              <td className="myProfile-right__info-column1">Фамилияңыз</td>
                              <td className="myProfile-right__info-column2">
                                <input type="text" value={user?.surname} readOnly></input>
                              </td>
                            </tr>
                            <tr className={"myProfile-right__info-input"}>
                              <td className="myProfile-right__info-column1">Электрондук почтаңыз</td>
                              <td className="myProfile-right__info-column2">
                                <input type="text" value={user?.email} readOnly></input>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                    <button className={"myProfile-right__logout"} onClick={logoutFromServer}>Аккаунттан чыгуу</button>
                  </>}
                  {activeTab === 'favorites' && <>
                  <div className={"myProfile-favorites"}>
                    <div className={"myProfile-favorites__title"}>
                      Чөп каттар
                    </div>
                    <div className={"myProfile-favorites__books"}>
                      {favorites.length > 0 ? favorites.map((favorite, index) => {
                        return (
                          <div key={index} className={"myProfile-favorites__book"}>
                            <div className={"myProfile-favorites__book-info"}>
                              <div className={"myProfile-favorites__book-info-title"}><Link href={`/books/${favorite.link}`}>{favorite?.name}</Link></div>
                              <div className={"myProfile-favorites__book-info-author"}>{favorite.author.fullname}</div>
                              <div className={"myProfile-favorites__book-info-short"}>{favorite.short}</div>
                            </div>
                          </div>
                        )
                      }): <div className={"myProfile-favorites__empty"}>Чөп каттарыңыздагы китептер жок</div>}
                    </div>
                  </div>
                  </>}
                  
                </div>
              </div>
          </Container>
      </main>
    );
  }
   
  return <LoadingScreen></LoadingScreen>;
}