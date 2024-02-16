"use client";
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '@/app/auth/authContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoadingScreen from '@/components/loadingScreens/loadingScreen';

interface BookPage {
  id: number;
  audio: string;
  book: number;
  page: number;
  text: string;
}
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
export default function ReadPage({ params }: { params: { page: number, slug: string } }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [book, setBook] = useState<Book>();
  const [bookExist, setBookExist] = useState<boolean>();
  const [audio, setAudio] = useState('');
  const [ pageData, setPageData] = useState<BookPage>();
  const [ pageExist, setPageExist] = useState<boolean>();
  const [ previousPageExist, setPreviousPageExist] = useState<boolean>();
  const [ nextPageExist, setNextPageExist] = useState<boolean>();

  useEffect(() => {
    getPage();
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

  // Получение страницы
  async function getPage() {
    try {
      const res = await axios.get(
        `${process.env.API_ROUTE}/content/books/${params.slug}/view_page/${params.page}  `
      );
      if(res.status === 200) { 
        setPageData(res.data);
        setAudio(`http://217.151.230.35:999${res.data.audio}`)
        setPageExist(true);
      }
    } catch (error) {
      if ((error as any)?.response?.status === 404) {
        console.log((error as any).response.data);
        setPageExist(false);
      } else if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  // Получение предыдущей страницы
  async function getPreviousPage() {
    try {
      const res = await axios.get(
        `${process.env.API_ROUTE}/content/books/${params.slug}/view_page/${params.page-1}  `
      );
      if(res.status === 200) { 
        setPreviousPageExist(true);
      }
    } catch (error) {
      setPreviousPageExist(false);
      if ((error as any)?.response?.status === 404) {
        console.log((error as any).response.data);
      } else if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  // Получение следующей страницы
  async function getNextPage() {
    try {
      const res = await axios.get(
        `${process.env.API_ROUTE}/content/books/${params.slug}/view_page/${params.page+1}  `
      );
      if(res.status === 200) { 
        setNextPageExist(true);
      }
    } catch (error) {
      setNextPageExist(false);
      if ((error as any)?.response?.status === 404) {
        console.log((error as any).response.data);
      } else if ((error as any)?.response?.status === 400) {
        console.log((error as any).response.data);
      } else {
        console.log(`Ошибка`, error);
      }
    }
  }

  // Получение книги
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

  if(pageExist && windowWidth > 0) {
    return (
      <Container className='readPage-container'>
        <div className='readPage-title'><h1>{book?.name}</h1></div>
        <div className='readPage-content'>
          <div className='readPage-left'>
            <div className='readPage-textarea'>
              {pageData?.text}
            </div>
          </div>
          
          <div className="readPage-right">
            {audio !== "" ? <>
              <audio controls className='readPage-audio-control' key={audio}>
                Сиздин браузерде аудио файлдарды ойнотууга мүмкүнчүлүк бар эмес
                <source src={`${audio}`} type='audio/mpeg'/>              
              </audio>
            </> : null}
          </div>
        </div>
        <div className='readPage-pagination'>
          {previousPageExist ? <Link href={`/books/${params.slug}/read/${params.page-1}`}><div className='readPage-pagination__button'>{params.page-1}</div></Link> : null}
          {pageExist ? <Link href={`/books/${params.slug}/read/${params.page}`}><div className='readPage-pagination__button'>{params.page}</div></Link> : null}
          {nextPageExist ? <Link href={`/books/${params.slug}/read/${params.page+1}`}><div className='readPage-pagination__button'>{params.page-1}</div></Link> : null}
        </div>
      </Container>
    )
  }

  if (pageExist == false) {
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
