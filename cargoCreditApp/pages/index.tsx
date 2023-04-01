import CargoDashboard from '@/components/CargoDashboard'
import Landing from '@/components/Landing'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {

  const { account } = useEthers()

  const router = useRouter()

  useEffect(() => {
    if (account) {
      router.push('/googleconnect')
    }
  }, [account])

  return (
    <>
      <Landing />
    </>
  )
}
