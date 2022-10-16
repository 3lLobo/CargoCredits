import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
// import { useTheme } from 'next-themes';
import Image from 'next/future/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DropdownAccount, ToggleColorMode } from '.';
import { ConnectWalletButton } from '.'
import { motion } from 'framer-motion'



const Navbar = () => {
  const { account, library, activate } = useEthers()
  // const { theme } = useTheme()
  const [loaded, setLoaded] = useState(true)

  // useEffect(() => {
  //   if (theme) {
  //     setLoaded(true)
  //   }
  // })

  // Set up provider if already connected

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

  return (
    <nav className="px-4 py-4">
      <div className="container flex flex-wrap justify-between items-center mx-auto max-w-6xl">
        {loaded ? (
          <div
            className={!account ? "opacity-0" : "opacity-100"}
          >
            <Link href="/">
              <Image
                src="/treeCargo.svg"
                height={80}
                width={80}
                alt="cargoTreeicon"
              // sizes="100vw"
              // className={`filter-logo-${theme}`}
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
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row gap-x-11 align-middle">
          {account ? (
            <DropdownAccount account={account} />
          ) : (
            // <></>
            <motion.div
              className="flex justify-center"
              initial={{ y: 10, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <ConnectWalletButton />
            </motion.div>
          )
          }
          <ToggleColorMode />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
