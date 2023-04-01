import { useEthers, } from '@usedapp/core';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, } from 'react';
import { DropdownAccount, ToggleColorMode } from '.';
import { ConnectWalletButton } from '.'
import { motion } from 'framer-motion'
import { Hyperspace } from '../Chains';
import { useRouter } from 'next/router';



const Navbar = () => {
  const { account, library, activate, chainId, switchNetwork } = useEthers()
  const router = useRouter()

  useEffect(() => {
    const { ethereum } = window
    const checkMetaMaskConnected = async () => {
      if (ethereum && !library) {
        var provider = new ethers.providers.Web3Provider(ethereum)
        const accounts = await provider.listAccounts()
        const connected = accounts.length > 0
        if (connected) {
          activate(provider)
        }
      }
    }
    checkMetaMaskConnected()
  }, [library])

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

  useEffect(() => {
    if (!account) {
      const currentPath = router.pathname
      if (currentPath !== '/') {
        router.push('/')
      }
    }
  }, [account])


  return (
    <nav className="px-4 py-4 w-full h-fit flex flex-row justify-end ">
      <div className="flex flex-row gap-x-11 justify-end h-10 align-middle">
        <div className="flex flex-row gap-x-11 w-full justify-end  mt-3">
          {account ? (
            <DropdownAccount account={account} />
          ) : (
            // <></>
            <motion.div
              className="flex justify-end"
              initial={{ y: 10, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <ConnectWalletButton />
            </motion.div>
          )
          }
          {/* <ToggleColorMode /> */}
        </div>
        <motion.div
          className="flex flex-row gap-x-6 w-full justify-end "
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={account ? 'visible' : 'hidden'}
          style={account ? { justifyContent: 'space-between' } : { justifyContent: 'flex-start' }}
          transition={{ duration: 1 }}
        >
          <Link href="/">
            <Image
              src="/treeCargo.svg"
              height={69}
              width={69}
              alt="cargoTreeicon"
            />
            <div
              className="h-6 relative"
            >
              <Image
                src={'/Cargo-Credit-FONT.png'}
                alt='bannerCargo'
                // css={css}
                fill
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </nav >
  )
}

export default Navbar
