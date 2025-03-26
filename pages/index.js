// pages/index.js
import Head from 'next/head';
import Trackpad from '../components/Trackpad';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trackpad</title>
        <meta name="description" content="A music player for YouTube playlists" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff268e" />
      </Head>
      <Trackpad />
    </>
  );
}