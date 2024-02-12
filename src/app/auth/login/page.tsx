'use client'
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import Image from 'next/image';


import googleIcon from "../../../assets/icons/google-icon.svg";
import unlockedPassword from "../../../assets/icons/unlock-password.svg";
import lockedPassword from "../../../assets/icons/lock-password.svg";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import { AuthContext } from "../authContext";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [passwordType, setpasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(lockedPassword);
    const authContext = useContext(AuthContext);
    const { isAuthenticated, setIsAuthenticated } = authContext || {};
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    
    function login() {
        if (setIsAuthenticated) {
            setIsAuthenticated(true);
            router.push(`/myProfile`);
        }
    }
    // Изменение видимости пароля
    useEffect(() => {
        if (passwordInputRef.current && passwordInputRef.current.type === "text") {
            setPasswordIcon(unlockedPassword);
        } else if (passwordInputRef.current && passwordInputRef.current.type === "password") {
            setPasswordIcon(lockedPassword);
        }
    }, [passwordInputRef.current?.type]);

    // Проверка на клиента
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
        
        );
    }

    function toggleVisibility() {
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

    function handleSubmit (e: React.FormEvent<HTMLFormElement>){
        const form = e.currentTarget;
        e.preventDefault();
        login();
        // console.log(e)
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        // if (form.checkValidity() === true) {
        //     orderConfirm(event);
        //     sendEmail(event);
        // }
        // setValidated(true);
    };

    return (
            <Container className="login-container">
                <header className="login-header">
                <h1 className="login-header-title"><Link href="/">ProseKG</Link></h1>
                </header>
                <main className="login-component">
                    <div className="login-form-wrapper">
                        <Form className="login__form "noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="validationMail">
                                <Form.Control className="login__input"
                                    required
                                    type="email"
                                    name="user_email"
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 login__password" controlId="validationPassword">
                                <Form.Control className="login__input"
                                    required
                                    ref={passwordInputRef}
                                    type={passwordType}
                                    name="password"
                                    placeholder="Пароль"
                                />
                                <Image className="login__password-logo" onClick={toggleVisibility} src={passwordIcon} alt="" />
                            </Form.Group>
                            <div className="login-options">
                                <Form.Check className="login-options__remember-me" type={'checkbox'} id={`default-checkbox`} label={`Запомнить меня`}/>
                                <Link className="login-options__forgot-password" href="#">Забыли пароль?</Link>
                            </div>
                            <Button className="login__button"type="submit">Войти</Button>
                        </Form>
                        {/* <div className="login-social-component">
                            <div className="login-social__separator">
                                <div></div>
                                <div className="login-social__separator-text">Или</div>
                                <div></div>
                            </div>
                            <div className="login-social-options">
                                <Button className="login-social-button -google">
                                    <div className="login-social-icon">
                                        <Image src={googleIcon} alt="Google Icon" />   
                                    </div>
                                    <div className="login-social-text">Войти через Google</div>
                                    <div></div>
                                </Button>
                            </div>
                        </div> */}
                    </div>
                </main>
                
            </Container>
    );
}


