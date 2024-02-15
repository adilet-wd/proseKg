"use client";
import LoadingScreen from "@/components/loadingScreens/loadingScreen";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import bookmark from "../../../assets/icons/Bookmark.svg";
import Link from "next/link";

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
  const [windowWidth, setWindowWidth] = useState(0);
  const [book, setBook] = useState<Book>();
  const [bookExist, setBookExist] = useState<boolean>();

  useEffect(() => {
    getBook();
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

  if(bookExist && windowWidth > 0) {
    return (
      <>
        <Container>
          <h1>Китепкана</h1>
          <div className="detailsBlock">
            <div className="detailsBlock_first">
              <img
                src={`${book?.pic}`}
                alt="error"
                className="detailsBlock_first-img"
              />
            </div>
            <div className="detailsBlock_second">
              <table className={"detailsBlock-information"}>
                <tbody>
                  <tr>
                    <td className={"detailsBlock-information__column1"}>Китептин аты:</td>
                    <td className={"detailsBlock-information__column2"}>{book?.name}</td>
                  </tr>
                  <tr>
                    <td className={"detailsBlock-information__column1"}>Автор:</td>
                    <td className={"detailsBlock-information__column2"}>{book?.author.fullname}</td>
                  </tr>
                  <tr>
                    <td className={"detailsBlock-information__column1"}>Жанр:</td>
                    <td className={"detailsBlock-information__column2"}>{book?.genre.name}</td>
                  </tr>
                </tbody>
              </table>
              <div className="detailsBlock_second-opt">
                <button className="detailsBlock_second-btn">Окуу</button>
                <Image src={bookmark} alt="error" />
              </div>
              <div className="detailsBlock_second-short">{book?.short}</div>
            </div>
          </div>
        </Container>
      </>
    );
  }
  if (bookExist == false) {
    return (
      <Container>
        <div className="not-found">
            <h1><Link href={"/"}>404</Link></h1>
            <h2>Китеп табылган жок</h2>
            <p>The book you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>
      </Container>
    );
  }
  return <LoadingScreen></LoadingScreen>;
  
}
