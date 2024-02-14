import Image from "next/image";
import styles from "./page.module.scss";
import Header from "@/components/header/header";
import Library from "./library/page";
import FirstSection from "@/components/firstSection/firstSection";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <div className="nav-placeholder"></div>
      <Header></Header>
      <FirstSection />
      <main className={styles.main}></main>
    </Container>
  );
}
