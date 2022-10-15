import { RealmAppProvider } from '@/components/RealmApp'
import '@/styles/globals.css'
import { appId } from "@/constants/realm.json";
import Image from 'next/future/image';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div
        className='bg-mybg-dark w-screen h-screen flex flex-nowrap'>
        <div
          className="bg-[url('/treeCargo.svg')] w-80 h-80 opacity-10 animate-slow-spin bg-contain bg-no-repeat justify-self-center scale-300"
        >
          <RealmAppProvider appId={appId}>
            <Component {...pageProps} />)
          </RealmAppProvider>
        </div>
      </div>
    </>
  )
}

export default MyApp
