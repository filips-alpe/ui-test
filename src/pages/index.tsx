import { BlitzPage } from "@blitzjs/next";
import Head from "next/head";
import { Header } from "src/components/Header";

const Home: BlitzPage = () => {
  return (
    <main>
      <Head>
        <title>Device list</title>
      </Head>
      <Header />
    </main>
  );
};

export default Home;
