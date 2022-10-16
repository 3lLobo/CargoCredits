import { RealmAppProvider } from '@/components/RealmApp'
import '@/styles/globals.css'
import realmconfig from "@/constants/realm.json";
import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components/layout';
import { DAppProvider, Localhost, Chain } from '@usedapp/core'


export const OptimismGoerli: Chain = {
  chainId: 420,
  chainName: 'Optimism Goerli Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) =>
    `https://blockscout.com/optimism/goerli//address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockscout.com/optimism/goerli//tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://goerli.optimism.io',
  blockExplorerUrl: 'https://blockscout.com/optimism/goerli',
  nativeCurrency: {
    name: 'Optimism Goerli Testnet',
    symbol: 'ETH',
    decimals: 18,
  },
}
const config: any = {
  readOnlyChainId: OptimismGoerli.chainId,
  readOnlyUrls: {
    [OptimismGoerli.chainId]: OptimismGoerli.rpcUrl,
  },
  networks: [OptimismGoerli],
}


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <DAppProvider config={config}>
          <RealmAppProvider appId={realmconfig.appId}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RealmAppProvider>
        </DAppProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
