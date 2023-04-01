import { Chain } from "@usedapp/core";



export const Hyperspace: Chain = {
  chainId: 3141,
  chainName: 'Filecoin - Hyperspace testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) =>
    `https://hyperspace.filscan.io/address/general?address=${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://hyperspace.filscan.io/#/message/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://rpc.ankr.com/filecoin_testnet',
  blockExplorerUrl: 'https://hyperspace.filscan.io',
  nativeCurrency: {
    name: 'Filecoin - hyperspace testnet',
    symbol: 'tFIL',
    decimals: 18,
  },
}
