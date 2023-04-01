import '@/styles/globals.css'
// import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/layout';
import { DAppProvider, Localhost, Chain, Config, Goerli } from '@usedapp/core'
import { Hyperspace } from '@/components/Chains';
import { GoogleOAuthProvider } from '@react-oauth/google';




const config: Config = {
  readOnlyChainId: Hyperspace.chainId,
  readOnlyUrls: {
    [Hyperspace.chainId]: Hyperspace.rpcUrl,
  },
  networks: [Hyperspace],
}


function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <ThemeProvider> */}
      <DAppProvider config={config}>
        <GoogleOAuthProvider
          clientId='256813757677-7hg6m1c6pqg3tvenlbhha3736bt55am2.apps.googleusercontent.com'
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GoogleOAuthProvider>
      </DAppProvider>
      {/* </ThemeProvider> */}
    </>
  )
}

export default MyApp
