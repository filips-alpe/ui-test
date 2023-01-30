import { BlitzPage } from "@blitzjs/next";
import Head from "next/head";
import { Header } from "src/components/Header";

const DevicePage: BlitzPage = () => {
  return (
    <main>
      <Head>
        <title>Device details</title>
      </Head>
      <Header />
    </main>
  );
};

export default DevicePage;
