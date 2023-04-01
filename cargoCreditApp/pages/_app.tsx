import '@/styles/globals.css'
// import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/layout';
import { DAppProvider, Localhost, Chain, Config, Goerli } from '@usedapp/core'


// export const OptimismGoerli: Chain = {
//   chainId: 420,
//   chainName: 'Optimism Goerli Testnet',
//   isTestChain: true,
//   isLocalChain: false,
//   multicallAddress: '0x0000000000000000000000000000000000000000',
//   getExplorerAddressLink: (address: string) =>
//     `https://blockscout.com/optimism/goerli//address/${address}`,
//   getExplorerTransactionLink: (transactionHash: string) =>
//     `https://blockscout.com/optimism/goerli//tx/${transactionHash}`,
//   // Optional parameters:
//   rpcUrl: 'https://goerli.optimism.io',
//   blockExplorerUrl: 'https://blockscout.com/optimism/goerli',
//   nativeCurrency: {
//     name: 'Optimism Goerli Testnet',
//     symbol: 'ETH',
//     decimals: 18,
//   },
// }
const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: Goerli.rpcUrl,
  },
  // networks: [OptimismGoerli],
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
