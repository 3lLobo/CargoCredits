import { Navbar } from '../navbar';
import Head from 'next/head';
import Image from 'next/image';

export default function Layout(props: any) {

  return (
    <>
      <div
      >
        {/* <div
          className="absolute right-10 bottom-3 bg-[url('/treeCargo.svg')] w-80 h-80 opacity-100 animate-slow-spin bg-contain bg-no-repeat"
        /> */}
        <Head>
          <title>Cargo Credits</title>
          <meta name="description" content="CargoCredits let you offset carbon!" />
          <link rel="icon" type="image/svg+xml" href="/treeCargo.svg" />
        </Head>
        <main
          className='flex flex-col bg-mybg-light w-screen h-screen scrollbar-hide overflow-clip'
        >
          <div
            className="absolute  w-[30vh] aspect-1 opacity-30 animate-slow-spin flex overflow-clip "
          >
            <Image
              src={'/treeCargo.svg'}
              alt="tree"
              placeholder='blur'
              blurDataURL='/treeCargo.svg'
              fill
            />
          </div>
          <Navbar />
          {props.children}
        </main>
      </div>
    </>
  )
}
