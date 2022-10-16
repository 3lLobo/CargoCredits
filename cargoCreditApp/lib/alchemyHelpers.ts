import { Network, Alchemy, TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { ethers } from 'ethers'


// Setup
const settings = {
  apiKey: "VH2FOlf7nZwwviTeSVh99RxHLwEVHbze",
  network: Network.OPT_GOERLI,
};
const alchemy = new Alchemy(settings);

const tokenContractAddresses = ["0x964d176Cf1641CF4d73E44e4382DA48027346Eb7"];



export async function getCargoCreditBalance(address: string): Promise<TokenBalancesResponseErc20 | void> {

  if (ethers.utils.isAddress(address)) {
    const balance = await alchemy.core.getTokenBalances("0x369551E7c1D29756e18BA4Ed7f85f2E6663e1e8d", tokenContractAddresses);

    return balance
  }
}
