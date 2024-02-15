"use client";
import React from "react";
import writerimg from "../../assets/images/Img Writer (1).svg";
import Image from "next/image";

export default function secondSection() {
  return (
    <>
      <div className={"secondBlock"}>
        <div className={"secondBlock_info"}>
          <h1>
            <strong>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet,
              fugiat?
            </strong>
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
            dolores quo ad voluptate iusto nemo culpa rem optio laboriosam aut
            quod, eveniet tenetur repellendus, delectus alias cum ab sit at!
          </p>
          {/* <button className={"secondBlock_btn"}>Начать</button> */}
        </div>
        <Image src={writerimg} alt="error" className={"secondBlock_img"} />
      </div>
    </>
  );
}
