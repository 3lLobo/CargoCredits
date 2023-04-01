import { useState, useEffect, useCallback } from 'react'
import { useEthers } from '@usedapp/core'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
// import { useTheme } from 'next-themes'
import { ethers } from 'ethers'
import { Hyperspace } from '../Chains'
import Image from 'next/image'

const ConnectWalletButton = () => {
  // const { theme } = useTheme()
  const { activate, library, account, chainId, switchNetwork } = useEthers()
  const [activateError, setActivateError] = useState('')

  useEffect(() => {
    async function checkNetwork() {
      if (chainId !== Hyperspace.chainId) {
        await switchNetwork(Hyperspace.chainId)
      }
    }
    if (chainId) {
      checkNetwork()
    }
  }, [chainId])


  // Handle Hydration mismatch
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  // Set up Web3modal
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(undefined)
  useEffect(() => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: '14a0951f47e646c1b241aa533e150219',
        },
      },
    }

    if (loaded) {
      const newWeb3Modal = new Web3Modal({
        providerOptions,
        cacheProvider: false,
        theme: "dark",
      })

      setWeb3Modal(newWeb3Modal)
    }
  }, [loaded])

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal?.connect()
      await activate(provider)
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }, [web3Modal, activate])

  if (!loaded) return null

  return (
    <button
      className="container w-52 h-11 text-white bg-ccgreen2 hover:bg-ccgreen3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-ccgreen2 dark:focus:ring-ccgreen3 line-clamp-1 grid grid-flow-col gap-2 grid-cols-4 "
      onClick={connect}
    >
      <div
        className="relative w-ful col-span-1 flex justify-center items-center align-middle h-full -my-1 bg-cyan-200 hover:bg-cyan-100 rounded-full"
      >
        <Image
          // className='absolute scale-300'
          src="/filecoin_cool.png"
          alt="Filecoin Logo"
          width={400}
          height={400}
        />
      </div >
      <span
        className=" flex ml-2 h-8 truncate col-span-3"
      >
        Connect Wallet
      </span>
    </button>
  )
}

export default ConnectWalletButton
