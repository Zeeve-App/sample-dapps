import type { NextPage } from 'next';
import Head from 'next/head';
import ClientComponent from '../components/ClientComponent';
import { Swap } from '../components/swap/Swap';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EthDex</title>
        <meta name="description" content="Basic Eth Dex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientComponent component={<Swap />} />
    </>
  );
};

export default Home;
