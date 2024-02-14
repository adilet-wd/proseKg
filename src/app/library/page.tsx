"use client";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../auth/authContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/card/card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

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
interface Genre {
  id: number;
  name: string;
  link: string;
}

export default function Library() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const [isClient, setIsClient] = useState(false);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [genres, setGenres] = useState<Array<Genre>>([]);

  useEffect(() => {
    getBooks();
    getGenres();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function getBooks() {
    try {
      const res = await axios.get(`${process.env.API_ROUTE}/content/books/`);
      console.log(res.data);
      setBooks(res.data);
    } catch (error) {
      if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }
  async function getGenres() {
    try {
      const res = await axios.get(`${process.env.API_ROUTE}/content/genres/`);
      console.log(res.data);
      setGenres(res.data);
    } catch (error) {
      if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  if (!isClient) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <Container>
      <div>LibraryPage</div>
      <h2>Книги</h2>
      <ul>
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
      </ul>
      <h2>Жанры</h2>
      <ul>
        {genres.length != 0 ? (
          genres.map((genre, index) => {
            return (
              <li key={index}>
                <h3>Название: {genre.name}</h3>
              </li>
            );
          })
        ) : (
          <li>Нет книг</li>
        )}
      </ul>
    </Container>
  );
}
