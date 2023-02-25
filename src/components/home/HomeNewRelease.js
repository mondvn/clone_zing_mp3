import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/vi'

import icons from '../../ultis/icons'

const { AiOutlineRight } = icons
const activeStyle = 'text-white text-xs font-normal bg-pink-#9b4de0 px-6 py-[6px] border border-pink-#9b4de0 rounded-full uppercase hover:brightness-[0.9]'
const notActiveStyle = 'text-white text-xs font-normal px-6 py-[6px] border border-black-#ffffff1a rounded-full uppercase hover:brightness-[0.9]'

const HomeNewRelease = ({ newRelease, title }) => {
  // console.log(newRelease)
  // console.log('Home New Release: re-render')
  const [buttonActive, setButtonActive] = useState('all')
  const [data, setData] = useState([newRelease?.all])

  const handleButtonFilter = (state) => {
    switch (state) {
      case 'all':
        setButtonActive('all')
        setData(newRelease?.all)
        break
      case 'vn':
        setButtonActive('vn')
        setData(newRelease?.vPop)
        break
      case 'worldwide':
        setButtonActive('worldwide')
        setData(newRelease?.others)
        break
      default:
        break;
    }
  }

  // Xử lý lần đầu mount sẽ có dữ liệu luôn
  useEffect(() => {
    setData(newRelease?.all)
  }, [newRelease])

  return (
    <div className='mt-12 mb-5'>
      <header className='flex mb-5 items-center justify-between'>
        <h3 className='text-white text-xl font-bold'>{title}</h3>
      </header>
      <div className='flex flex-col'>
        <header className='flex w-full justify-between mb-4'>
          <div className='flex items-center justify-between gap-[15px]'>
            <button
              className={buttonActive === 'all' ? activeStyle : notActiveStyle}
              onClick={() => handleButtonFilter('all')}
            >
              Tất Cả
            </button>
            <button
              className={buttonActive === 'vn' ? activeStyle : notActiveStyle}
              onClick={() => handleButtonFilter('vn')}
            >
              Việt Nam
            </button>
            <button
              className={buttonActive === 'worldwide' ? activeStyle : notActiveStyle}
              onClick={() => handleButtonFilter('worldwide')}
            >
              Quốc Tế
            </button>
          </div>
          <Link className='text-black-#FFFFFF80 text-sm font-medium flex items-center justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={18} />
          </Link>
        </header>
        <div className='grid grid-cols-3 gap-x-[28px] rounded-md'>
          {data?.slice(0, 12).map((item, index) => (
            <div className='flex p-[10px]' key={index}>
              <img
                className='mr-[10px] h-[60px] w-[60px] rounded-sm object-contain'
                src={item?.thumbnail}
                alt='thumbnail'
              />
              <div className='flex flex-col justify-between text-xs font-medium text-black-#FFFFFF80'>
                <span className='text-sm text-white font-medium line-clamp-1'>{item?.title}</span>
                <h3 className='flex gap-1'>
                  {item?.artists?.map((artist, index) => (
                    <Link key={artist?.id}>{artist?.name}</Link>
                  ))}
                </h3>
                <span className='capitalize'>{moment.unix(item?.releaseDate).fromNow()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeNewRelease