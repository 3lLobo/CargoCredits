import { Navbar } from '../navbar';
import Head from 'next/head';

export default function Layout(props: any) {

  return (
    <>
      <div
        className='flex flex-col bg-mybg-light w-screen h-screen flex-nowrap flex-grow-0 scrollbar-hide'
      >
        <div
          className="absolute right-10 bottom-3 bg-[url('/treeCargo.svg')] w-80 h-80 opacity-10 animate-slow-spin bg-contain bg-no-repeat"
        />
        <Head>
          <title>Cargo Credits</title>
          <meta name="description" content="CargoCredits let you offset carbon!" />
          <link rel="icon" type="image/svg+xml" href="/treeCargo.svg" />
        </Head>
        <Navbar />
        <main
          className="mx-11"
        >
          {props.children}
        </main>
      </div>
    </>
  )
}
