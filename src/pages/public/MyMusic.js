import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import icons from '../../ultis/icons'
import { myMusicMenu } from '../../ultis/menu'

const { BsFillPlayFill } = icons
const notActiveStyle = 'flex items-center justify-center py-4 text-[15px] text-[#a0a0a0] font-medium leading-none hover:text-white'
const activeStyle = 'flex items-center justify-center py-4 text-[15px] text-white border-b border-pink-#c86dd7 font-medium leading-none'

const MyMusic = () => {
  return (
    <div className='mx-[59px] mt-[140px]'>
      <div className='flex items-center justify-start gap-4'>
        <h3 className='text-white text-[40px] font-bold'>Thư viện</h3>
        <button
          // onClick={() => handlePlaySong(chartData?.RTChart?.items[0]?.encodeId)}
          className='relative h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
          <BsFillPlayFill size={30} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
          <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
        </button>
      </div>
      <div className='flex flex-start border-b border-black-#ffffff1a h-[47px] items-center'>

        <div className='flex flex-start gap-10'>
          {myMusicMenu.map((item) => (
            <NavLink
              className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
              key={item.text}
              to={item.path}
            >
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className='mt-[30px] w-full'><Outlet /></div>
    </div>
  )
}

export default MyMusic