

import CargoDashboard from '@/components/CargoDashboard'
import { selectIsLoggedIn } from '@/redux/GoogleSlice'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function CargoDashboardPage() {

  const { account } = useEthers()
  const router = useRouter()
  const rootStore = useSelector((state: any) => state)
  const isLoggedIn = selectIsLoggedIn(rootStore as any)
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn])

  return (
    <div
      className="font-poppins flex flex-col h-[50vh] mt-[25vh] mx-6 rounded-xl shadow-2xl text-charcoal bg-white pb-6"
    >
      <CargoDashboard />
    </div>
  )
}
