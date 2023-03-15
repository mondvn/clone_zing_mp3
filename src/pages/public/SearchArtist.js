import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import icons from '../../ultis/icons'
import { handleDevineNumber } from '../../ultis/fn'


const { SlUserFollow } = icons

const SearchArtist = () => {
  const { searchData } = useSelector(state => state.music)
  return (
    <div className='mx-[29px] lg:mx-[59px]'>
      <div className='mt-7 flex flex-col'>
        <div className='mb-5 flex justify-between items-center'>
          <span className='text-xl text-white font-bold'>Nghệ Sĩ/OA</span>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 min-[1350px]:grid-cols-5 gap-7'>
          {searchData?.artists.map(item => (
            <div key={item?.encodeId}>
              <div className='flex flex-col items-center justify-center'>
                <Link to={item?.link.split('.')[0]} className='relative overflow-hidden rounded-full cursor-pointer group'>
                  <img
                    src={item?.thumbnailM}
                    alt='thumbnail'
                    className='w-full object-contain rounded-full shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
                  />
                </Link>
                <Link to={item?.link.split('.')[0]} className='mt-3 mb-1'>
                  <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{item?.name}</h4>
                </Link>
                <span className='text-xs font-medium text-black-#FFFFFF80'>{handleDevineNumber(item?.totalFollow)} quan tâm</span>
                <button className='py-[6px] px-[19px] mt-[15px] mb-5 flex items-center justify-center text-white text-xs font-normal bg-pink-#9b4de0 rounded-full gap-1'>
                  <SlUserFollow size={12} />
                  <span className='uppercase'>Quan tâm</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchArtist