import React from 'react'

import logoDark from '../assets/images/logo-dark.svg'
import liveTag from '../assets/images/live-tag.svg'
import { sidebarMainMenu, sidebarSecondMenu } from '../ultis/menu'
import { Link, NavLink } from 'react-router-dom'
import path from '../ultis/path'
import Scrollbars from 'react-custom-scrollbars-2'

const notActiveStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#A0A0A0] flex justify-start items-center hover:text-primary-text-color'
const activeStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#FFFFFF] flex justify-start items-center bg-[hsla(0,0%,100%,0.1)] border-l-[3px] border-[#994cdd]'

const SidebarLeft = () => {

  return (
    <div className='flex flex-col bg-[hsla(0,0%,100%,0.05)] h-full pb-[90px] '>
      {/* Logo */}
      <Link
        to={path.HOME}
        className='w-full h-[70px] px-[28px] flex items-center justify-start cursor-pointer'
      >
        <img src={logoDark} alt='logo' className='w-[120px] h-10 object-contain' />
      </Link>
      <div className='flex flex-col w-full h-full'>
        {/* Main Navbar */}
        <div className='flex flex-col'>
          {sidebarMainMenu.map((item) => (
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
        {/* Devine */}
        <div className='flex justify-center h-[1px] my-[15px]'>
          <div className='w-[80%] bg-black-#ffffff1a'></div>
        </div>
        {/* Second Navbar wiht scroll */}
        <div className='flex flex-col w-full h-full'>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            {sidebarSecondMenu.map((item) => (
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
          </Scrollbars>
        </div>
      </div>
    </div>
  )
}

export default SidebarLeft