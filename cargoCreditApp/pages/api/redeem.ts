import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from 'next'
import { transferCargoCredit } from "@/lib/ethersHelpers";
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors)

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
    setTimeout(() => {
      res.status(200).json({ tx });
    }, 15000);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
