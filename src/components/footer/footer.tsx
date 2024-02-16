"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import vkicon from "../../assets/icons/VK.svg";
import tgicon from "../../assets/icons/Telegram.svg";
import inicon from "../../assets/icons/Instagram.svg";

export default function Footer() {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth > 0) {
    return (
      <div className="footer">
        <Container>
          <div className="footer_block">
            <div className="footer_block-info">
              <h4 className="footer_block-logo">
                Prose<h4>Kg</h4>
              </h4>
              Биздин онлайн билим булагына кош келдиңиз. Суйуктуу
              китептериңизден рахат алыңыз. Биздин сайт сизге чыгармаларга
              кызыгып, китептерди окуганга гана эмес, аудиокитептерди укканга
              мүмкүнчүлүк берет.
            </div>
            <div className="footer_block-nav">
              <Link href="/">Башкы бет</Link>
              <Link href="/textToAudio">Аудио</Link>
              <Link href="/library">Китепкана</Link>
            </div>
            <div>
              Байланышуу:
              <br />
              +996999555333
              <br />
              kanatbekovich36@gmail.com
              <div className="footer_block-soc">
                <Image src={tgicon} alt="error" />
                <Image src={vkicon} alt="error" />
                <Image src={inicon} alt="error" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return <></>;
}
