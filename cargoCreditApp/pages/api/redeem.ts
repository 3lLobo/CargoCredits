import { ethers } from "ethers";
import { transferCargoCredit } from "@/lib/ethersHelpers";

export default async function handler(req, res) {
  // Check if it is a POST request
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method not allowed",
      method: req.method,
    });
    return;
  }
  // Check if the request is coming from the correct origin
  const referer = req.headers.referer;
  // console.log("Request from referer", referer);
  // console.log("Required referer", process.env.REFERER_URL)
  if (!referer || (referer !== process.env.REFERER_URL)) {
    res.status(403).json({
      error: "Forbidden",
    });
    return;
  }
  // Get the amount of cargo credits to redeem
  const amount = req.body.amount;
  // Get the target address
  const address = req.body.address;
  // Check if both are present
  if (!amount || !address) {
    res.status(400).json({
      error: "Missing amount or address",
      amount,
      address,
    });
    return;
  }

  const amountInWei = ethers.utils.parseEther(amount);

  try {
    const tx = await transferCargoCredit(address, amountInWei);
    res.status(200).json({ tx });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
