import { useEffect } from "react";
import { getCargoCreditBalance } from '@/lib/alchemyHelpers'
import { useEthers } from '@usedapp/core'
import { useState } from "react";


export default function ConvertCredits({ month, distance }) {

  const ALGORITHM = 1 / 201

  const { account } = useEthers()
  // TODO: get balance from contract
  const [balance, setBalance] = useState()

  useEffect(() => {
    async function getBalance() {
      if (account) {
        let bal
        try {
          bal = await getCargoCreditBalance(account)
        } catch {
          bal = "1"
        }
        // console.log("🚀 ~ file: ConvertCredits.jsx ~ line 16 ~ getBalance ~ bal", bal)
        setBalance(bal)
      }
    }
    getBalance()
  }, [account])

  return (
    <div
      className="flex flex-col gap 3 mt-11 justify-center align-middle  text-center"
    >
      <div
        className="flex flex-col gap 3 mt-11 justify-center align-middle"
      >
        {`Redeem your credits for ${month}`}
        <button
          className="w-50 text-white bg-ccgreen2 hover:bg-ccgreen3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-ccgreen2 dark:focus:ring-ccgreen3">
          {` ${distance * ALGORITHM} CGO`}
        </button>
      </div>
      <div
        className="mt-11 text-lg text-center">
        Your balance:
        <div>
          {balance + " CGO"}
        </div>
      </div>
    </div>
  )
}