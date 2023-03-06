import { useEffect, useState } from 'react'

import * as apis from '../../apis'
import bgTop100 from '../../assets/images/top100-bg.png'
import { Top100Item } from '../../components/Top100/'

const Top100 = () => {
  const [top100Data, setTop100Data] = useState(null)
  useEffect(() => {
    const fetchTop100Data = async () => {
      const response = await apis.apiGetTop100()
      if (response?.data?.err === 0) setTop100Data(response?.data?.data)
    }

    fetchTop100Data()
  }, [])

  return (
    <div>
      <div className='mt-[-70px] text-white relative overflow-hidden'>
        <img src={bgTop100} alt='bg-chart' className='object-cover w-full h-[260px] grayscale' />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff00] to-[#1e1e1e] opacity-80'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#1e1e1e] opacity-80'></div>
      </div>
      <div className='mx-[59px] mt-[-48px]'>
        {top100Data && top100Data.map((item, index) => (
          <Top100Item key={index} sliders={item} />
        ))}
      </div>
    </div>
  )
}

export default Top100