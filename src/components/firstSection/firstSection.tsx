"use client";
import React from "react";
import readingbook from "../../assets/images/Reading glasses-bro.svg";
import Image from "next/image";

export default function firstSection() {
  return (
    <div>
      <div className="firstBlock">
        <Image src={readingbook} alt="error" className="firstBlock_img" />
        <div className="firstBlock_info">
          <h1>
            <strong>
              Читайте или слушайте свои любимые книги на Кыргызском языке!
            </strong>
          </h1>
          <p>
            Добро пожаловать на наш уникальный онлайн-ресурс, где вы можете
            наслаждаться своими любимыми книгами на кыргызском языке. Мы
            предоставляем удобную возможность не только читать, но и слушать
            аудиокниги, погружаясь в увлекательные истории прямо через наш
            веб-браузер.
          </p>
          <button className="firstBlock_btn">Перевести книгу</button>
        </div>
      </div>
    </div>
  );
}
