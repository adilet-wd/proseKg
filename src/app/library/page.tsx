"use client";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";
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
import CardList from "@/components/cardList/cardList";

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
  const [windowWidth, setWindowWidth] = useState(0);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [genres, setGenres] = useState<Array<Genre>>([]);

  useEffect(() => {
    getBooks();
    getGenres();
  }, []);

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

  if(windowWidth !== 0 && books.length > 0 && genres.length > 0) {
    return (
      <Container>
        <h1>Китепкана</h1>
        <h2>Книги</h2>
        <CardList books={books}></CardList>
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

  return <LoadingScreen />;
}
