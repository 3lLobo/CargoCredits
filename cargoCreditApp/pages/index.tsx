import CargoDashboard from '@/components/CargoDashboard'
import Landing from '@/components/Landing'
import { useEthers } from '@usedapp/core'

export default function Home() {

  const { account } = useEthers()
  console.log("🚀 ~ file: index.tsx ~ line 8 ~ Home ~ account", account)
  return (
    <>
      {account
        ? <CargoDashboard />
        : <Landing />
      }
    </>
  )
}
