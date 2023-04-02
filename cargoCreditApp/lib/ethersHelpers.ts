// For interaction with the Cargo Credit contract on Filecoin Hypersapce.

import { BigNumber, ethers } from "ethers";
import ccAbi from "./cargoCreditsToken.abi.json";

const TOKEN_ADDRESS = "0x964d176Cf1641CF4d73E44e4382DA48027346Eb7";
const PAY_MASTER_ADDRESS = "0x79a838a70bf9c690baf1f5e10de57c2c1f50e371";

export async function getCargoCreditBalance(
  address: string
): Promise<string | void> {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.hyperspace.node.glif.io/rpc/v1"
  );
  const contract = new ethers.Contract(TOKEN_ADDRESS, ccAbi, provider);
  const balance = await contract.balanceOf(address);
  return balance.toString();
}

export async function transferCargoCredit(
  addressTo: string,
  amount: BigNumber,
): Promise<ethers.providers.TransactionResponse | void> {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.hyperspace.node.glif.io/rpc/v1"
  );
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_HYPERSPACE_KEY,
    provider
  );
  const addressFrom = await wallet.getAddress();
  const contract = new ethers.Contract(TOKEN_ADDRESS, ccAbi, wallet);
  const tx = await contract.transfer(addressTo, amount, { from: addressFrom });
  await tx.wait();

  return tx;
}
