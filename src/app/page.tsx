"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Library from "./library/page";
import FirstSection from "@/components/firstSection/firstSection";
import SecondSection from "@/components/secondSection/secondSection";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import CardList from "@/components/cardList/cardList";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";

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

export default function Home() {
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

  if (windowWidth !== 0 && books.length > 0 && genres.length > 0) {
    return (
      <>
      <div className="nav-placeholder"></div>
      <Header></Header>
      <main className={styles.main}>
        <Container>
          <FirstSection />
        </Container>
        <Container>
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ marginBottom: "20px" }}>Популярные:</h2>
            <CardList books={books}></CardList>
          </div>
        </Container>
        <Container>
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ marginBottom: "20px" }}>Аниме:</h2>
            <CardList books={books}></CardList>
          </div>
        </Container>
        <Container>
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ marginBottom: "20px" }}>Художественная литература:</h2>
            <CardList books={books}></CardList>
          </div>
        </Container>
        <Container>
          <SecondSection />
        </Container>
      </main>
      <Footer />
      </>
    )
  }

  return (
    <>
    <div className="nav-placeholder"></div>
    <Header></Header>
    <main className={styles.main}>
      <LoadingScreen/>
    </main>
    <Footer />
    </>
  );
}
