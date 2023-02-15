import React from 'react'

import logoDark from '../assets/images/logo-dark.svg'
import liveTag from '../assets/images/live-tag.svg'
import { sidebarMenu } from '../ultis/menu'
import { NavLink } from 'react-router-dom'

const notActiveStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#A0A0A0] flex justify-start items-center'
const activeStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#FFFFFF] flex justify-start items-center bg-[hsla(0,0%,100%,0.1)]'

const SidebarLeft = () => {
  return (
    <div className='flex flex-col bg-[hsla(0,0%,100%,0.05)]'>
      <div className='w-full h-[70px] px-[28px] flex items-center justify-start'>
        <img src={logoDark} alt='logo' className='w-[120px] h-10 object-contain' />
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map((item) => (
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
            to={item.path}
            key={item.path}
            end={item.end}
          >
            <div className='mr-[10px]'>{item.icon}</div>
            <span className='mr-2'>{item.text}</span>
            {item.popup && <img src={liveTag} alt='live tag' />}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft