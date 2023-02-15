import { useEffect } from 'react';

import * as apis from '../../apis'

function Home() {
  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await apis.getHome()
      console.log({ response })
    }
    fetchDataHome()
  }, [])

  return (
    <div className="overflow-y-auto mt-[70px]">
      Home
    </div>
  )
}

export default Home;