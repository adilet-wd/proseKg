'use client'
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import Image from 'next/image';

import googleIcon from "../../assets/images/google-icon.svg";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [validated, setValidated] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        e.preventDefault();
        console.log(e)
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
                <h1 className="login-header-title"><Link href="/">ProseKg</Link></h1>
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
                            <Form.Group className="mb-3" controlId="validationUserName">
                                <Form.Control className="login__input"
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Пароль"
                                />
                            </Form.Group>
                            <div className="login-options">
                                <Form.Check className="login-options__remember-me" type={'checkbox'} id={`default-checkbox`} label={`Запомнить меня`}/>
                                <Link className="login-options__forgot-password" href="/#">Забыли пароль?</Link>
                            </div>
                            <Button className="login__button"type="submit">Войти</Button>
                        </Form>
                        <div className="login-social-component">
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
                        </div>
                    </div>
                    <h4 className="login-signup"></h4>
                </main>
                
            </Container>
    );
}