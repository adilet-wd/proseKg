"use client";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import bookmark from "../../../assets/icons/Bookmark.svg";

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

export default function Book({ params }: { params: { slug: string } }) {
  const [book, setBook] = useState<Book>();
  const [bookExist, setBookExist] = useState<boolean>();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    try {
      const res = await axios.get(
        `${process.env.API_ROUTE}/content/books/${params.slug}`
      );
      console.log(res.data);
      setBook(res.data);
      setBookExist(true);
    } catch (error) {
      if ((error as any)?.response?.status === 404) {
        console.log((error as any).response.data);
        setBookExist(false);
      } else if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  if (bookExist === undefined) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (!bookExist) {
    return (
      <Container>
        <div>Книга не найдена</div>
        <>NOT FOUND PAGE</>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <h2>Китепкана</h2>
        <div className="detailsBlock">
          <div className="detailsBlock_first">
            <Image src={`${book?.pic}`} alt="error" width={500} height={700} />
            <div>
              <button>Кочуруу</button>
              <Image src={bookmark} alt="error" />
            </div>
          </div>
          <div className="detailsBlock_second">
            <div>{book?.name}</div>
            <div>{book?.short}</div>
          </div>
        </div>
      </Container>
    </>
  );
}
