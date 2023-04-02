import { useEffect, useLayoutEffect } from "react";
import { getCargoCreditBalance } from "@/lib/ethersHelpers";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRedeemedMonths } from "@/redux/GoogleSlice";
import { formatEther, parseEther } from "ethers/lib/utils";
import axios from "axios";
import { setRedeemedMonths } from "@/redux/GoogleSlice";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { Squares2X2Icon } from "@heroicons/react/20/solid";

export default function ConvertCredits({ month, distance }) {
  const { account } = useEthers();
  const dispatch = useDispatch();
  const rootState = useSelector((state) => state);
  const redeemedMoths = selectRedeemedMonths(rootState);
  const [isRedeemable, setIsRedeemable] = useState(false);

  useLayoutEffect(() => {
    if (redeemedMoths.includes(month)) {
      setIsRedeemable(false);
    } else {
      setIsRedeemable(true);
    }
  }, [month, redeemedMoths]);

  const [isRedeeming, setIsRedeeming] = useState(false);

  function handleRedeem() {
    setIsRedeeming(true);
    axios.post(
      "/api/redeem",
      {
        address: account,
        amount: String(distance * ALGORITHM),
      },
      {
        withCredentials: true,
      },
    ).then((res) => {
      console.log("res", res);
      dispatch(setRedeemedMonths(month));
      setIsRedeeming(false);
    }).catch((err) => {
      console.log("error: ", err);
      setIsRedeeming(false);
    });
  }

  const ALGORITHM = 1 / 201;
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBalance() {
      if (account) {
        if (!isRedeeming) {
          let bal;
          try {
            bal = await getCargoCreditBalance(account);
            console.log("balance", bal);
            bal = formatEther(bal);
            bal = Number(bal);
          } catch (error) {
            console.log("error", error);
            bal = "1";
          }
          setBalance(bal);
        }
      }
    }
    getBalance();
  }, [account, isRedeeming]);

  return (
    <div className="flex flex-col gap-11 mt-3 justify-start align-middle  text-center">
      {isRedeemable &&
        <div className="flex flex-col gap 3 mt-11 justify-center align-middle">
          <div
            className="flex flex-row gap-3 w-full text-center text-xl font-semibold mb-3"
          >
            {`Redeem your credits for ${month}`}
          </div>
          <button
            className="flex flex-row w-fit self-center text-white bg-ccgreen2 hover:bg-ccgreen3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-ccgreen2 dark:focus:ring-ccgreen3"
            onClick={handleRedeem}
            disabled={isRedeeming}
          >
            {isRedeeming ?
              <div
                className="flex flex-row gap-3 w-full animate-spin-bezier animate-pulse"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </div>
              :
              <>
                <span className="flex font-mono w-full text-left pr-1">
                  {` ${distance * ALGORITHM}`}
                </span>
                <span
                  className="flex font-semibold font-mono text-xs w-full text-left pb-2"
                >
                  {`CGO`}
                </span>
              </>
            }

          </button>
        </div>
      }
      <div className="my-11 text-lg text-center bg-emerald-700 p-4 rounded-lg text-slate-300">
        <span className="flex font-mono text-xs w-full text-left pb-2">
          Current Balance:
        </span>
        <div className="flex flex-row gap-3">
          <div className="bg-emerald-500 p-2 rounded-md font-mono text-slate-200 w-fit">
            {balance}
          </div>
          <div className="py-2 font-mono ">CGO</div>
        </div>
      </div>
    </div>
  );
}
