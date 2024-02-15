"use client";
import Link from "next/link";
import { Container } from "react-bootstrap";

export default function footer() {
  return (
    <div className="footer">
      <Container>
        <div className="footer_block">
          <div className="footer_block-info">
            Добро пожаловать на наш уникальный онлайн-ресурс, где вы можете
            наслаждаться своими любимыми книгами на кыргызском языке. Мы
            предоставляем удобную возможность не только читать, но и слушать
            аудиокниги, погружаясь в увлекательные истории прямо через ваш
            веб-браузер.
          </div>
          <div className="footer_block-nav">
            <Link href="/">Башкы бет</Link>
            <Link href="/myProfile">Өздүк кабинет</Link>
            <Link href="/library">Китепкана</Link>
          </div>
          <div>
            Байланышуу:
            <br />
            +996999555333
            <br />
            +996550444888
            <br />
            kanatbekovich36@gmail.com
          </div>
        </div>
      </Container>
    </div>
  );
}
