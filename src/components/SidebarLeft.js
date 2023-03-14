import React, { useEffect, useState } from 'react'

import logoDark from '../assets/images/logo-dark.svg'
import logoMini from '../assets/images/logo-mini.svg'
import liveTag from '../assets/images/live-tag.svg'
import icons from '../ultis/icons'
import { sidebarMainMenu, sidebarSecondMenu } from '../ultis/menu'
import { Link, NavLink } from 'react-router-dom'
import path from '../ultis/path'
import Scrollbars from 'react-custom-scrollbars-2'

const { RiMenu2Fill } = icons
const notActiveStyle = 'py-4 min-[1130px]:py-2 px-5 min-[1130px]:px-[25px] font-bold text-[13px] text-[#A0A0A0] flex justify-start items-center hover:text-primary-text-color gap-[10px]'
const activeStyle = 'py-4 min-[1130px]:py-2 min-[1130px]:px-[25px] px-5 font-bold text-[13px] text-[#FFFFFF] flex justify-start items-center bg-[hsla(0,0%,100%,0.1)] border-l-[3px] border-[#994cdd] gap-[10px]'

const SidebarLeft = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined })
  const [isShowMainLogo, setIsShowMainLogo] = useState(false)
  const [isShowNavbarMobile, setIsShowNavbarMobile] = useState(false)

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleSize)
    handleSize()
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  useEffect(() => {
    windowSize.width < 1130 ? setIsShowMainLogo(true) : setIsShowMainLogo(false)
  }, [windowSize])

  const handleShowNavbarMobile = () => {
    setIsShowNavbarMobile(!isShowNavbarMobile)
  }

  return (
    <div className='fixed min-[600px]:relative z-[999] flex flex-col min-[1130px]:w-[240px] min-[600px]:bg-[hsla(0,0%,100%,0.05)] h-[700px] min-[600px]:h-full pb-[90px] '>
      {/* Logo */}
      <Link
        to={path.HOME}
        className='w-full min-[1130px]:w-[240px] min-[1130px]:h-[90px] h-[70px] min-[1130px]:px-[28px] hidden min-[600px]:flex items-center justify-center min-[1130px]:justify-start cursor-pointer'
      >
        {isShowMainLogo
          ? <img src={logoMini} alt='logo' className='min-[1130px]:w-[120px] h-10 object-contain' />
          : <img src={logoDark} alt='logo' className='min-[1130px]:w-[120px] h-10 object-contain' />
        }
      </Link>
      <button
        onClick={handleShowNavbarMobile}
        className='w-[63px] min-h-[70px] flex min-[600px]:hidden items-center justify-center text-[#A0A0A0]'>
        <RiMenu2Fill size={24} />
      </button>
      <div className={`${isShowNavbarMobile ? 'flex' : 'hidden'} bg-[#292929] min-[600px]:flex flex-col w-full h-full`}>
        {/* Main Navbar */}
        <div className='flex flex-col'>
          {sidebarMainMenu.map((item) => (
            <NavLink
              className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
              to={item.path}
              key={item.path}
              end={item.end}
            >
              <div>{item.icon}</div>
              <span className='hidden min-[1130px]:flex mr-2'>{item.text}</span>
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
                <div className='min-[1130px]:mr-[10px]'>{item.icon}</div>
                <span className='hidden min-[1130px]:flex mr-2'>{item.text}</span>
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