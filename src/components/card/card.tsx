"use client";
import React from "react";
import Image from "next/image";
import playicon from "../../assets/icons/play.svg";
import bookmark from "../../assets/icons/Bookmark.svg";
import bookmarkfill from "../../assets/icons/Bookmark_fill.svg";
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

interface Genre {
  id: number;
  name: string;
  link: string;
}

export default function card({ book }: { book: Book }) {
  return (
    <div className="cardBlock">
      <div className="cardBlock_imgBlock">
        <img src={book.pic} alt="error" className="cardBlock_img" />
      </div>
      <div className="cardBlock_info">
        <div>
          <div className="cardBlock_info-options">
            <h5 className="cardBlock_info-title">{book.name}</h5>
            <Image
              src={bookmark}
              alt="error"
              className="cardBlock_info-bookmark"
            />
          </div>
          <h6 className="cardBlock_author">{book.author.fullname}</h6>
        </div>
        <Link href={`/books/${book.link}`}>
          <div className="cardBlock_info-btn">
            Окуу
            <Image src={playicon} alt="error" />
          </div>
        </Link>
      </div>
    </div>
  );
}
