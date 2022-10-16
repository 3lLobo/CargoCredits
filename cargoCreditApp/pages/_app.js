import { RealmAppProvider } from '@/components/RealmApp'
import '@/styles/globals.css'
import { appId } from "@/constants/realm.json";
import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <RealmAppProvider appId={appId}>
          <Layout>
            <Component {...pageProps} />)
          </Layout>
        </RealmAppProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
