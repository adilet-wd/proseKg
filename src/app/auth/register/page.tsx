"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Image from "next/image";

import unlockedPassword from "../../../assets/icons/unlock-password.svg";
import lockedPassword from "../../../assets/icons/lock-password.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../authContext";

import loginimg from "../../../assets/images/Tablet login-amico.svg";
import xmarkFeedback from "../../../assets/icons/xmark-feedback.svg";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";

interface RegisterData {
  username: string;
  name: string;
  surname: string;
  password: string;
  password_confirm: string;
  email: string;
}

interface RegisterConfirmData {
  username: string;
  name: string;
  surname: string;
  password: string;
  password_confirm: string;
  email: string;
  confirmation_code: "1875";
}

interface LoginData {
  username: string;
  password: string;
}
interface LoginResponse {
  refresh: string;
  access: string;
}

export default function RegisterPage() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [passwordType, setpasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(lockedPassword);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const { refreshToken, setRefreshToken } = authContext || {};
  const { accessToken, setAccessToken } = authContext || {};

  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  const [ isRequestSent, setIsRequestSent ] = useState(false);

// useState для валидации формы
  const [validated, setValidated] = useState(false);

  const [emailForm, setEmailForm] = useState<string>("");
  const [emailFormError, setEmailFormError] = useState<string>("");

  const [usernameForm, setUsernameForm] = useState<string>("");
  const [usernameFormErrors, setUsernameFormErrors] = useState<string[]>([]);

  const [nameForm, setNameForm] = useState<string>("");
  const [nameFormErrors, setNameFormErrors] = useState<string[]>([]);

  const [surnameForm, setSurnameForm] = useState<string>("");
  const [surnameFormErrors, setSurnameFormErrors] = useState<string[]>([]);

  const [passwordForm, setPasswordForm] = useState<string>("");
  const [passwordFormErrors, setPasswordFormErrors] = useState<string[]>([]);

  const [repeatPasswordForm, setRepeatPasswordForm] = useState<string>("");
  const [repeatPasswordFormError, setRepeatPasswordFormError] = useState<string>("");

// Функции для валидации
  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailFormError("Почтаңызды туура жазыныз");
      return false;
    }
    setEmailFormError("");
    return true;
  };
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailForm(e.target.value);
    validateEmail(e.target.value);
  };


  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  async function validateUsername(username: string) {
    let errors = [];

    if (username.length == 0) {
      errors.push("Колдонуучу атыңызды жазыныз");
    }

    if (username.length >= 20) {
      errors.push("Бул колдонуучунун аты бош эмес");
      errors.push("Колдонуучу атыңыз 20 тамгадан ашпасын");
    }

    if (/[^a-zA-Zа-яА-Я]/.test(username)) {
      errors.push("Тамгаларды гана жазыныз");
    }

    if (/[^a-zA-Z]/.test(username)) {
      errors.push("Латын тамгалар гана жазыныз");
    }
    
    if(errors.length === 0) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(async () => {
        if (isRequestSent === false) {
          const res = await checkUsernameUnique(username);
          if (res !== true) {
            errors.push("Бул колдонуучу ат бош эмес");
            setUsernameFormErrors(["Бул колдонуучу ат бош эмес"]);
          }
        }
      }, 1500);
    }
    
    setUsernameFormErrors(errors);
    return errors.length === 0;
  };
  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsernameForm(e.target.value);
    validateUsername(e.target.value);
  };
  async function checkUsernameUnique(username: string) {
    try {
        const res = await axios.post(
        `${process.env.API_ROUTE}/regauth/check-username/`,
          {username: username}
        );
        if(res.status === 200) {
            return true;
        } else {
          return false;
        }
    } catch (error) {
      return false;
    }
  }


  function validateName(name: string) {
    let errors = [];

    if (name.length === 0) {
      errors.push("Атыңызды жазыныз");
    }
    if (name.length >= 20) {
      errors.push("Атыңыз 20 тамгадан ашпасын");
    }
    
    if (/[^a-zA-Zа-яА-Я]/.test(name)) {
      errors.push("Тамгаларды гана жазыныз");
    }

    setNameFormErrors(errors);
    return errors.length === 0;
  };
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNameForm(e.target.value);
    validateName(e.target.value);
  };


  function validateSurname(surname: string) {
    let errors = [];

    if (surname.length === 0) {
      errors.push("Фамилияңызды жазыныз");
    }
    if (surname.length >= 20) {
      errors.push("Фамилияңыз 20 тамгадан ашпасын");
    }
    
    if (/[^a-zA-Zа-яА-Я]/.test(surname)) {
      errors.push("Тамгаларды гана жазыныз");
    }

    setSurnameFormErrors(errors);
    return errors.length === 0;
  };
  function handleSurnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSurnameForm(e.target.value);
    validateSurname(e.target.value);
  };


  function validatePassword(password: string) {
    let errors = [];

    if (password.length < 12) {
      errors.push("Сыр сөзүнүз 12 символдон кыска болбосун");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Жок дегенде 1 баш тамга болушу керек");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Жок дегенде 1 кичине тамга болушу керек");
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push("Жок дегенде бир сан болуш керек");
    }
    
    setPasswordFormErrors(errors);
    return errors.length === 0;
  };
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordForm(e.target.value);
    validatePassword(e.target.value);
  };


  function validateRepeatPassword(password: string) {
    if (password !== passwordForm) {
      setRepeatPasswordFormError("Сыр сөздөр дал келиш керек");
      return false;
    }
    setRepeatPasswordFormError("");
    return true;
  };
  function handleRepeatPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRepeatPasswordForm(e.target.value);
    validateRepeatPassword(e.target.value);
  };



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

  // Редирект на страницу Профиля, если пользователь уже вошел
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/myProfile");
    }
  }, [isAuthenticated, router]);

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

  // Переключение видимости инпута пароля
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

  // Изменение статуса логина клиента
  function login(data: LoginResponse) {
    if(setIsAuthenticated && setRefreshToken && setAccessToken){
      setIsAuthenticated(true);
      setRefreshToken(data.refresh);
      setAccessToken(data.access);
    }
  }
  
  // POST запрос, логин
  async function loginRequest(data: LoginData) {
    try {
      const res = await axios.post(
        `${process.env.API_ROUTE}/regauth/login/`,
        data
      );
      return res;
    } catch (error) {
      if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
      return (error as any)?.response;
    }
  }

  // Функция для логина
  async function handleLogin(data: LoginData) {
    const loginData = await loginRequest(data);
    if (loginData?.status === 200) {
      login(loginData.data);
    }
  }

  // POST запрос, регистрация.
  async function registerRequest(data: RegisterData) {
    try {
      const res = await axios.post(
        `${process.env.API_ROUTE}/regauth/register/`,
        data
      );
      if(res.status === 201) {
        const dataToConfirm = {data, confirmation_code: res.data.confirmation_code};
        const resConfirm = await axios.patch(
          `${process.env.API_ROUTE}/regauth/register/`,
          dataToConfirm
        );
        if(resConfirm.status === 200) {
          await handleLogin({username: data.username, password: data.password});
        }

      }
    } catch (error) {
      alert("Ошибка регистрации");
      setIsRequestSent(false);
      if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  // Задержка отправки формы регистрации
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const isEmailValid = validateEmail(emailForm);
    const isUsernameValid = await validateUsername(usernameForm);
    const isNameValid = validateName(nameForm);
    const isSurnameValid = validateSurname(surnameForm);
    const isPasswordValid = validatePassword(passwordForm);
    const isRepeatPasswordValid = validateRepeatPassword(repeatPasswordForm);

    const dataToSubmit: RegisterData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      surname: formData.get("surname") as string,
      name: formData.get("name") as string,
      password: formData.get("password") as string,
      password_confirm: formData.get("password_confirm") as string,
    };
    if(isEmailValid && isUsernameValid && isNameValid && isSurnameValid && isPasswordValid && isRepeatPasswordValid) {
      setIsRequestSent(true);
      await registerRequest(dataToSubmit);
    }
  }


  if(windowWidth !== 0) {
    return (
      <Container className="register-container">
        <Image src={loginimg} alt="error" className="register-img" />
        <main className="register-component">
          <div className="register-form-wrapper">
            <Form className="register__form" noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3 register__group register__email" controlId="validationEmail">
                <Form.Control
                  autoFocus={true}
                  className="register__input"
                  required
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={emailForm} 
                  onChange={handleEmailChange}
                />
                <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                  {emailFormError ? 
                  <div className="invalid-feeback__item">
                    <Image src={xmarkFeedback} alt="" width={20} height={20}/>
                    {emailFormError}
                  </div> : null}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group
                className="mb-3 register__group register__name"
                controlId="validationUsername">
                <Form.Control
                  className="register__input"
                  required
                  type="text"
                  name="username"
                  placeholder="Колдонуучу ат"
                  value={usernameForm} 
                  onChange={handleUsernameChange}
                />
                <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                  {usernameFormErrors ? usernameFormErrors.map((error, index) => (
                    <div key={index} className="invalid-feeback__item">
                    <Image src={xmarkFeedback} alt="" width={20} height={20}/>
                    {error}
                    </div>
                   ))
                  : null}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group
                className="mb-3 register__group register__name"
                controlId="validationName">
                <Form.Control
                  className="register__input"
                  required
                  type="text"
                  name="name"
                  placeholder="Ат"
                  value={nameForm} 
                  onChange={handleNameChange}
                />
                <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                  {nameFormErrors ? nameFormErrors.map((error, index) => (
                    <div key={index} className="invalid-feeback__item">
                    <Image src={xmarkFeedback} alt="" width={20} height={20}/>
                    {error}
                    </div>
                   ))
                  : null}
                </Form.Control.Feedback>
              </Form.Group>
              
  
              <Form.Group
                className="mb-3 register__group register__surname"
                controlId="validationSurname">
                <Form.Control
                  className="register__input"
                  required
                  type="text"
                  name="surname"
                  placeholder="Фамилия"
                  value={surnameForm} 
                  onChange={handleSurnameChange}
                />
  
                <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                  {surnameFormErrors ? surnameFormErrors.map((error, index) => (
                    <div key={index} className="invalid-feeback__item">
                    <Image src={xmarkFeedback} alt="" width={20} height={20}/>
                    {error}
                    </div>
                   ))
                  : null}
                </Form.Control.Feedback>
  
              </Form.Group>
  
              <Form.Group
                className="mb-3 register__group register__password"
                controlId="validationPassword">
                  <div className="register__password-top">
                    <Form.Control
                    className="register__input"
                    required
                    ref={passwordInputRef}
                    type={passwordType}
                    name="password"
                    placeholder="Сыр сөз"
                    value={passwordForm} 
                    onChange={handlePasswordChange}
                  />
                  <Image
                    className="register__password-logo"
                    onClick={toggleVisibility}
                    src={passwordIcon}
                    alt=""
                  />
                  </div>
                  <div className="register__password-bottom">
                    <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                    {passwordFormErrors ? passwordFormErrors.map((error, index) => (
                      <div key={index} className="invalid-feeback__item">
                      <Image src={xmarkFeedback} alt="" width={20} height={20}/>
                      {error}
                      </div>
                    ))
                    : null}
                  </Form.Control.Feedback>  
                  </div>
  
                
                
              </Form.Group>
  
              <Form.Group
                className="mb-3 register__group register__password"
                controlId="validationPasswordRepeat">
                <Form.Control
                  className="register__input"
                  required
                  ref={passwordInputRef}
                  type={passwordType}
                  name="password_confirm"
                  placeholder="Сыр сөздү кайталап жазыңыз"
                  value={repeatPasswordForm} 
                  onChange={handleRepeatPasswordChange}
                />
                <Form.Control.Feedback className="register__invalid-feedback" type="invalid">
                  {repeatPasswordFormError ? 
                  <div className="invalid-feeback__item">
                    <Image src={xmarkFeedback} alt="" width={20} height={20}/>
                    {repeatPasswordFormError}
                  </div> : null}
                </Form.Control.Feedback>
              </Form.Group>
  
              <Button className="register__button" type="submit">
                Катталуу
              </Button>
              <div className="register__option-voity">
                Аккаунтуңуз бар болсо&nbsp;<Link href="/auth/login"> Кириңиз</Link>
              </div>
            </Form>
          </div>
          <h4 className="register-signup"></h4>
        </main>
      </Container>
    );
  }
  return (
    <LoadingScreen></LoadingScreen>
  )
}
