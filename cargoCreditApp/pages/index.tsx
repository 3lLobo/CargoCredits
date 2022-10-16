import CargoDashboard from '@/components/CargoDashboard'
import Landing from '@/components/Landing'
import { useEthers } from '@usedapp/core'

export default function Home() {

  const { account } = useEthers()
  return (
    <>
      {account
        ? <CargoDashboard />
        : <Landing />
      }
    </>
  )
}
