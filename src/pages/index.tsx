import { BlitzPage } from "@blitzjs/next";
import Head from "next/head";
import { DeviceList } from "src/components/DeviceList";
import { Header } from "src/components/Header";

const Home: BlitzPage = () => {
  return (
    <main>
      <Head>
        <title>Device list</title>
      </Head>
      <Header />
      <DeviceList />
    </main>
  );
};

export default Home;
