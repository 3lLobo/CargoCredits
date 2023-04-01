import '@/styles/globals.css'
// import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/layout';
import { DAppProvider, Localhost, Chain, Config, Goerli } from '@usedapp/core'
import { Hyperspace } from '@/components/Chains';




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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
      {/* </ThemeProvider> */}
    </>
  )
}

export default MyApp
