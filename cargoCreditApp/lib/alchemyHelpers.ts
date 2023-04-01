import { Network, Alchemy, TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { ethers } from 'ethers'


// Setup
// TODO: set Filecoin API key
const settings = {
  apiKey: "VH2FOlf7nZwwviTeSVh99RxHLwEVHbze",
  network: Network.OPT_GOERLI,
};
const alchemy = new Alchemy(settings);

const tokenContractAddresses = ["0x964d176Cf1641CF4d73E44e4382DA48027346Eb7"];



// TODO: Fix Contract address
export async function getCargoCreditBalance(address: string): Promise<string | void> {

  if (ethers.utils.isAddress(address)) {
    const balance = await alchemy.core.getTokenBalances("0x369551E7c1D29756e18BA4Ed7f85f2E6663e1e8d", tokenContractAddresses);

    if (balance?.tokenBalances[0]) {
      return balance?.tokenBalances[0].tokenBalance;
    } else {
      return;
    }
  }
}
