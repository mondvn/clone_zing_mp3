import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { searchMenu } from '../../ultis/menu'

const notActiveStyle = 'flex items-center justify-center py-4 mx-5 text-[12px] sm:text-[15px] text-[#a0a0a0] font-medium leading-[18px] min-[430px]:leading-none hover:text-white text-center'
const activeStyle = 'flex items-center justify-center py-4 mx-5 text-[12px] sm:text-[15px] text-white border-b border-pink-#c86dd7 font-medium leading-[18px] min-[430px]:leading-none text-center'

const Search = () => {
  return (
    <div className=''>
      <div className='flex flex-col min-[830px]:flex-row flex-start pl-[29px] lg:pl-[59px] border-b border-black-#ffffff1a min-[830px]:h-[47px] min-[830px]:items-center items-start'>
        <div className='text-xl sm:text-2xl text-white  font-semibold sm:font-bold pr-6 min-[830px]:border-r min-[830px]:border-black-#ffffff1a'>Kết Quả Tìm Kiếm</div>
        <div className='ml-[-20px] min-[830px]:ml-0 flex flex-start'>
          {searchMenu.map((item) => (
            <NavLink
              className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
              to={item.path}
              key={item.path}
            >
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div><Outlet /></div>
    </div>
  )
}

export default Search