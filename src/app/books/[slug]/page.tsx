"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

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
  const [books, setBooks] = useState<Array<Book>>([]);
  const JSONbooks = [
    {
        "pic": "http://217.151.230.35:999/media/media/2024-01-18_20.47.28.jpg",
        "name": "Жизнь Орихиме Иноуэ",
        "short": "она крутая (это я)",
        "link": "cf0c44ab-6596-4af6-b576-dde185148f78",
        "author": {
            "id": 1,
            "pic": "http://217.151.230.35:999/media/media/2024-01-18_20.47.43.jpg",
            "fullname": "Орихиме Иноуэ",
            "bio": "Моя жена",
            "link": "2ff9f0db-ecc2-4371-ac38-ff29f058dd14"
        },
        "genre": {
            "id": 1,
            "name": "Автобиография",
            "link": "96ef425c-7f11-47f1-8170-1316dd28e1b2"
        },
        "audio": "http://217.151.230.35:999/media/audio/%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%20%D0%9E%D1%80%D0%B8%D1%85%D0%B8%D0%BC%D0%B5%20%D0%98%D0%BD%D0%BE%D1%83%D1%8D.mp3"
    },
    {
        "pic": "http://217.151.230.35:999/media/media/2024-01-18_20.48.36.jpg",
        "name": "Рангику Мацумота",
        "short": "она моя подруга",
        "link": "ba082bf1-3593-4c47-9567-3bed62e2fa10",
        "author": {
            "id": 1,
            "pic": "http://217.151.230.35:999/media/media/2024-01-18_20.47.43.jpg",
            "fullname": "Орихиме Иноуэ",
            "bio": "Моя жена",
            "link": "2ff9f0db-ecc2-4371-ac38-ff29f058dd14"
        },
        "genre": {
            "id": 1,
            "name": "Автобиография",
            "link": "96ef425c-7f11-47f1-8170-1316dd28e1b2"
        },
        "audio": "http://217.151.230.35:999/media/audio/%D0%A0%D0%B0%D0%BD%D0%B3%D0%B8%D0%BA%D1%83%20%D0%9C%D0%B0%D1%86%D1%83%D0%BC%D0%BE%D1%82%D0%B0.mp3"
    }
  ]
  
  useEffect(() => {
    setBooks(JSONbooks);
  }, []);

  async function getBook() {
    try {
        const res = await axios.get(`${process.env.API_ROUTE}/content/books/${params.slug}`);
        console.log(res.data);
        setBooks(res.data);
    } catch(error) {
        if ((error as any)?.response?.status === 400) {
            console.log((error as any).response.data);
        } else {
            console.log(`Ошибка`, error);
        }
    }
  }


  return (
    <>
    <Container>
      <div>My Post: {params.slug}</div>
    </Container>
    </>
  )
}