import { useEffect } from "react";
import { getCargoCreditBalance } from '@/lib/ethersHelpers'
import { useEthers } from '@usedapp/core'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRedeemedMonths } from "@/redux/GoogleSlice";
import { formatEther, parseEther } from "ethers/lib/utils";


export default function ConvertCredits({ month, distance }) {
  const dispacth = useDispatch();
  const rootState = useSelector((state) => state);
  const redeemedMoths = selectRedeemedMonths(rootState);

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
          console.log("balance", bal)
          bal = formatEther(bal)
          bal = Number(bal)
        } catch (error) {
          console.log("error", error)
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
      className="flex flex-col gap-11 mt-3 justify-start align-middle  text-center"
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
        className="my-11 text-lg text-center bg-emerald-700 p-4 rounded-lg text-slate-300"
      >
        <span
          className="flex font-mono text-xs w-full text-left pb-2"
        >
          Current Balance:
        </span>
        <div
          className='flex flex-row gap-3'
        >
          <div
            className="bg-emerald-500 p-2 rounded-md font-mono text-slate-200 w-fit"
          >
            {balance}
          </div>
          <div
            className="py-2 font-mono "
          >
            CGO
          </div>
        </div>
      </div >
    </div >
  )
}