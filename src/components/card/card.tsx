"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import playicon from "../../assets/icons/play.svg";
import bookmarkNew from "../../assets/icons/bookmark-regular.svg";
import bookmarkNewOrange from "../../assets/icons/bookmark-regularOrange.svg";

import bookmarkfill from "../../assets/icons/Bookmark_fill.svg";
import Link from "next/link";
import { AuthContext } from "@/app/auth/authContext";

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

export default function Card({ book }: { book: Book }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext || {};
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkNew);

  const { refreshToken, setRefreshToken } = authContext || {};
  const { accessToken, setAccessToken } = authContext || {};
  
  async function addToFavorite() {
    setBookmarkIcon(bookmarkNewOrange);
    setTimeout(() => {
      setBookmarkIcon(bookmarkNew);
    }, 300);
  }

  return (
    <div className="cardBlock">
      <div className="cardBlock_imgBlock">
        <img src={book.pic} alt="error" className="cardBlock_img" />
      </div>
      <div className="cardBlock_info">
        <div>
          <div className="cardBlock_info-options">
            <h5 className="cardBlock_info-title">{book.name}</h5>
            {isAuthenticated ? <Image
              src={bookmarkIcon}
              alt=""
              width={30}
              height={30}
              className="cardBlock_info-bookmark"
              onClick={addToFavorite}
            /> : null}
          </div>
          <h6 className="cardBlock_author">{book.author.fullname}</h6>
        </div>
        <Link href={`/books/${book.link}`}>
          <div className="cardBlock_info-btn">
            <div className="cardBlock_info-text">Окуу</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
