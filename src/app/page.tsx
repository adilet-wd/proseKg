import Image from "next/image";
import styles from "./page.module.scss";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <>
      <div className="nav-placeholder"></div>
      <Header></Header>
      <main className={styles.main}>
      
      </main>
    </>
    
  );
}
