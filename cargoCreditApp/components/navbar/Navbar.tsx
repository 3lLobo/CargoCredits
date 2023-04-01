import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
// import { useTheme } from 'next-themes';
import Image from 'next/image';
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
    <nav className="px-4 py-4 w-full h-fit flex flex-row justify-end ">
      <div className="flex flex-row gap-x-11 justify-end h-10">
        {/* <div className="flex flex-row gap-x-11 w-full justify-end"> */}
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
        <ToggleColorMode />
        {/* </div> */}
        <motion.div
          className="flex flex-row gap-x-6 w-full justify-end"
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
              height={80}
              width={80}
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
