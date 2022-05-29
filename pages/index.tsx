import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coindirect | WiiQare</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the demo of{" "}
          <a href="https://www.coindirect.com">Coindirect</a> API
        </h1>
      </main>
    </div>
  );
};

export default Home;
