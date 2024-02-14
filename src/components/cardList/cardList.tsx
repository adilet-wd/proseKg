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

export default function cardList() {
  const [books, setBooks] = useState([]);

  return (
    <>
      <Swiper
        slidesPerView={4}
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
