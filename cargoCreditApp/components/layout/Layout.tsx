import { Navbar } from '../navbar';
import Head from 'next/head';
import Image from 'next/image';
import { Roboto, Montserrat } from 'next/font/google'


const montserrat = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function Layout(props: any) {

  return (
    <>
      <div
      >
        <Head>
          <title>Cargo Credits</title>
          <meta name="description" content="CargoCredits let you offset carbon!" />
          <link rel="icon" type="image/svg+xml" href="/treeCargo.svg" />
        </Head>
        <main
          className={montserrat.className + 'flex flex-col bg-mybg-light w-screen h-screen scrollbar-hide overflow-clip'}
        >
          <div
            className="absolute  w-[36vh] aspect-1 opacity-30 animate-slow-spin flex overflow-clip "
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
