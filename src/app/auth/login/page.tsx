"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import Image from "next/image";

import unlockedPassword from "../../../assets/icons/unlock-password.svg";
import lockedPassword from "../../../assets/icons/lock-password.svg";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import { AuthContext } from "../authContext";
import { useRouter } from "next/navigation";

import loginimg from "../../../assets/images/Tablet login-amico.svg";
import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}
interface LoginResponse {
  refresh: string;
  access: string;
}

export default function LoginPage() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [passwordType, setpasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(lockedPassword);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const { refreshToken, setRefreshToken } = authContext || {};
  const { accessToken, setAccessToken } = authContext || {};
  const [ userExistance, setUserExistance] = useState<string>("");

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Изменение видимости пароля
  useEffect(() => {
    if (passwordInputRef.current && passwordInputRef.current.type === "text") {
      setPasswordIcon(unlockedPassword);
    } else if (
      passwordInputRef.current &&
      passwordInputRef.current.type === "password"
    ) {
      setPasswordIcon(lockedPassword);
    }
  }, [passwordInputRef.current?.type]);

  // Проверка на клиента
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Редирект на страницу Профиля, если пользователь уже вошел
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/myProfile");
    }
  }, [isAuthenticated, router]);

  function login(data: LoginResponse) {
    if(setIsAuthenticated && setRefreshToken && setAccessToken){
      setIsAuthenticated(true);
      setRefreshToken(data.refresh);
      setAccessToken(data.access);
    }
    
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const dataToSubmit: LoginData = {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      };
      const loginData = await loginRequest(dataToSubmit);
      if (loginData?.status === 200) {
        login(loginData.data);
      } else {
        setUserExistance("Мындай колдонуучу жок");
      }
    } catch (error) {
      setUserExistance("Мындай колдонуучу жок")
    }
    
  }
  
  async function loginRequest(data: LoginData) {
    try {
      const res = await axios.post(
        `${process.env.API_ROUTE}/regauth/login/`,
        data
      );
      return res;
    } catch (error) {
      return (error as any)?.response;
    }
  }

  function toggleVisibility() {
    if (passwordInputRef.current) {
      if (passwordType === "password") {
        setpasswordType("text");
        setPasswordIcon(unlockedPassword);
      } else {
        setpasswordType("password");
        setPasswordIcon(lockedPassword);
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
    <Container className="login-container">
      <Image src={loginimg} alt="error" className="login-img" />
      <main className="login-component">
        <div className="login-form-wrapper">
          <Form className="login__form " noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationMail">
              <Form.Control
                className="login__input"
                required
                type="username"
                name="username"
                placeholder="Колдонуучу ат"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3 login__password"
              controlId="validationPassword">
              <Form.Control
                className="login__input"
                required
                ref={passwordInputRef}
                type={passwordType}
                name="password"
                placeholder="Сыр сөз"
              />
              <Image
                className="login__password-logo"
                onClick={toggleVisibility}
                src={passwordIcon}
                alt=""
              />
            </Form.Group>
            <div className="login-options__user-existance">
              {userExistance}
            </div>
            {/* <div className="login-options">
              <Form.Check
                className="login-options__remember-me"
                type={"checkbox"}
                id={`default-checkbox`}
                label={`Запомнить меня`}
              />
              <Link className="login-options__forgot-password" href="#">
                Забыли пароль?
              </Link>
            </div> */}
            <Button className="login__button" type="submit">
              Войти
            </Button>
            <div className="login-options__haveaccount">
              Аккаунтуңуз жок болсо&nbsp;<Link className="login-options__haveaccount2" href="/auth/register"> Катталыңыз</Link>
            </div>
          </Form>
        </div>
      </main>
    </Container>
  );
}
