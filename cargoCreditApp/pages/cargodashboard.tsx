

import CargoDashboard from '@/components/CargoDashboard'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function CargoDashboardPage() {

  const { account } = useEthers()
  const router = useRouter()
  useEffect(() => {
    if (!account) {
      router.push('/')
    }
  }, [account])

  return (
    <div
      className="font-poppins flex flex-col h-[50vh] mt-[25vh] mx-6 rounded-xl shadow-2xl text-charcoal bg-white pb-6"
    >
      <CargoDashboard />
    </div>
  )
}
