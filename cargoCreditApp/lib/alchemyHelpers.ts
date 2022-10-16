import { Network, Alchemy, TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { ethers } from 'ethers'


// Setup
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY,
  network: Network.OPT_GOERLI,
};
const alchemy = new Alchemy(settings);


export async function getCargoCreditBalance(address: string): Promise<TokenBalancesResponseErc20 | void> {

  if (ethers.utils.isAddress(address)) {
    const balance = await alchemy.core.getTokenBalances(address);

    return balance
  }
}
