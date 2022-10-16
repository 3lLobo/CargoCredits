import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { ConnectWalletButton } from '.'
// import { connectFactory } from '../../helpers/contracts'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

const LogInBox = () => {
  const { account, library: provider } = useEthers()
  const [authType, setAuthType] = useState('')
  const router = useRouter()

  // Load data to know if user has wallet
  // useEffect(() => {
  //   const loadInfo = async () => {
  //     if (provider && account) {
  //       try {
  //         // if (account !== ethers.constants.AddressZero) {
  //         router.push('./cargodashboard')
  //         // }
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   }
  //   if (provider && account) {
  //     loadInfo()
  //   }
  // }, [provider, account, router])

  return (
    <>
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
    </>
  )
}

export default LogInBox