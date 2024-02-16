"use client";
import React from "react";
import readingbook from "../../assets/images/Reading glasses-bro.svg";
import Image from "next/image";

export default function firstSection() {
  return (
    <div>
      <div className={"firstBlock"}>
        <Image src={readingbook} alt="error" className={"firstBlock_img"} />
        <div className={"firstBlock_info"}>
          <h1>
            <strong className={"firstBlock_title"}>
              Суйуктуу китептериңизди кыргыз тилинде окуңуз, угуңуз!
            </strong>
          </h1>
          <p>
          Биздин онлайн билим булагына кош келдиңиз. Суйуктуу китептериңизден рахат алыңыз. Биздин сайт сизге чыгармаларга кызыгып, китептерди окуганга гана эмес, аудиокитептерди укканга мүмкүнчүлүк берет.
          </p>
          {/* <button className={"firstBlock_btn"}>Начать</button> */}
        </div>
      </div>
    </div>
  );
}
