'use client'
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Image from 'next/image';

import unlockedPassword from "../../../assets/icons/unlock-password.svg";
import lockedPassword from "../../../assets/icons/lock-password.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../authContext";

interface RegisterData {
    username: string;
    name: string;
    // surname: string;
    password: string;
    passwordRepeat: string;
    email: string;
  }

export default function RegisterPage() {
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [passwordType, setpasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(lockedPassword);
    const authContext = useContext(AuthContext);
    const { isAuthenticated, setIsAuthenticated } = authContext || {};
    const router = useRouter();
    
    // Изменение видимости пароля
    useEffect(() => {
        if (passwordInputRef.current && passwordInputRef.current.type === "text") {
            setPasswordIcon(unlockedPassword);
        } else if (passwordInputRef.current && passwordInputRef.current.type === "password") {
            setPasswordIcon(lockedPassword);
        }
    }, [passwordInputRef.current?.type]);

    // Редирект на страницу Профиля, если пользователь уже вошел
    useEffect(() => {
        if (isAuthenticated) {
          router.push('/myProfile'); 
        }
    }, [isAuthenticated, router]);

    // Переключение видимости инпута пароля
    function toggleVisibility(){
        if (passwordInputRef.current) {
            if (passwordType === "password") {
                setpasswordType("text");
                setPasswordIcon(unlockedPassword);
            } else {
                console.log("Нажатие")
                setpasswordType("password");
                setPasswordIcon(lockedPassword);
            }
        }
    };

    // Задержка отправки формы регистрации
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const dataToSubmit: RegisterData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            name: formData.get("name") as string, 
            passwordRepeat: formData.get("passwordRepeat") as string, 
        };
        registerRequest(dataToSubmit);
    }

    // POST запрос, регистрация.
    async function registerRequest(data: RegisterData) {
        try {
            const res = await axios.post(`${process.env.API_ROUTE}/regauth/register/`, data);
            console.log(res.data);
            return res.data;
        } catch(error) {
            if ((error as any)?.response?.status === 400) {
                console.log((error as any).response.data);
            } else {
                console.log(`Ошибка`, error);
            }
        }
    }


    return (
            <Container className="register-container">
                <header className="register-header">
                <h1 className="register-header-title"><Link href="/">ProseKG</Link></h1>
                </header>
                <main className="register-component">
                    <div className="register-form-wrapper">
                        <Form className="register__form "noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="validationMail">
                                <Form.Control className="register__input"
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 register__name" controlId="validationUsername">
                                <Form.Control className="register__input"
                                        required
                                        type="text"
                                        name="username"
                                        placeholder="Имя пользователя"
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3 register__name" controlId="validationName">
                                <Form.Control className="register__input"
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Имя"
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3 register__surname" controlId="validationSurname">
                                <Form.Control className="register__input"
                                        required
                                        type="text"
                                        name="Surname"
                                        placeholder="Фамилия"
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3 register__password" controlId="validationPassword">
                                <Form.Control className="register__input"
                                        required
                                        ref={passwordInputRef}
                                        type={passwordType}
                                        name="password"
                                        placeholder="Пароль"
                                    />
                                    <Image className="register__password-logo" onClick={toggleVisibility} src={passwordIcon} alt="" />
                            </Form.Group>
                            <Form.Group className="mb-3 register__password" controlId="validationPasswordRepeat">
                                <Form.Control className="register__input"
                                        required
                                        ref={passwordInputRef}
                                        type={passwordType}
                                        name="passwordRepeat"
                                        placeholder="Повторите пароль"
                                    />
                            </Form.Group>
                            <Button className="register__button"type="submit">Зарегистрироваться</Button>
                        </Form>
                    </div>
                    <h4 className="register-signup"></h4>
                </main>
                
            </Container>
    );
}


