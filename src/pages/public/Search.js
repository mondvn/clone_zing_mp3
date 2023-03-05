import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { searchMenu } from '../../ultis/menu'

const notActiveStyle = 'flex items-center justify-center py-4 mx-5 text-[15px] text-[#a0a0a0] font-medium leading-none hover:text-white'
const activeStyle = 'flex items-center justify-center py-4 mx-5 text-[15px] text-white border-b border-pink-#c86dd7 font-medium leading-none'

const Search = () => {
  return (
    <div className=''>
      <div className='flex flex-start pl-[59px] border-b border-black-#ffffff1a h-[47px] items-center'>
        <div className='text-2xl text-white font-bold pr-6 border-r border-black-#ffffff1a'>Kết Quả Tìm Kiếm</div>
        <div className='flex flex-start'>
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