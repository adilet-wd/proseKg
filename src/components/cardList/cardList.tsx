"use client";
import React, { useState } from "react";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Card from "../card/card";
import Book from "@/app/books/[slug]/page";

interface Book {
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
interface CardListProps {
  books: Book[];
}

interface Genre {
  id: number;
  name: string;
  link: string;
}

export default function CardList({ books }: CardListProps) {
  return (
    <>
      <Swiper
        slidesPerView={7}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper">
        {books.length != 0 ? (
          books.map((book, index) => {
            return (
              <SwiperSlide key={index}>
                <Card key={index} book={book} />
              </SwiperSlide>
            );
          })
        ) : (
          <li>Нет книг</li>
        )}
      </Swiper>
    </>
  );
}
