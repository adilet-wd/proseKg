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
function truncateText(text: string, wordLimit: number) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
  } else {
      return text;
  }
}

export default function CardList({ books }: CardListProps) {
  console.log(books)
  let newBooks = [];
  for(let j = 0; j < 2; j++) {
    for (let i = 0; i < books.length; i++) {
        let bookCopy = { ...books[i] };
        bookCopy.name = truncateText(bookCopy.name, 4); 
        newBooks.push(bookCopy);
    }
  }
  books = newBooks;
  return (
    <>
      <Swiper
        slidesPerView={2}
        breakpoints={{
          320: {
            slidesPerView: 2, 
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          767: {
            slidesPerView: 4,
            spaceBetween: 30,

          },
          1024: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper carousel-library">
        {books.length != 0 ? (
          books.map((book, index) => {
            return (
              <SwiperSlide key={index}>
                <Card key={index} book={book} />
              </SwiperSlide>
            );
          })
        ) : (
          null
        )}
      </Swiper>
    </>
  );
}
