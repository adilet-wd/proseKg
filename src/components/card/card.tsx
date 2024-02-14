"use client";
import React from "react";
import Image from "next/image";
import bookcover from "../../assets/images/Book Cover.png";
import playicon from "../../assets/icons/play.svg";
import bookmark from "../../assets/icons/Bookmark.svg";
import bookmarkfill from "../../assets/icons/Bookmark_fill.svg";

export default function card() {
  return (
    <div className="cardBlock">
      <Image src={bookcover} alt="error" className="cardBlock_img" />
      <div className="cardBlock_info">
        <div className="cardBlock_info-options">
          <h5 className="cardBlock_info-title">Принцип изменения</h5>
          <Image
            src={bookmark}
            alt="error"
            className="cardBlock_info-bookmark"
          />
        </div>
        <div className="cardBlock_info-btn">
          Слушать
          <Image src={playicon} alt="error" />
        </div>
      </div>
    </div>
  );
}
