import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import icons from '../ultis/icons'
import { HeaderSearch } from './header/'

const { BsArrowLeft, BsArrowRight, VscDesktopDownload, TbShirt, RiVipDiamondLine, FiSettings } = icons

const Header = ({ headerColor, isTransparent }) => {
  const { isShowPlaylist } = useSelector(state => state.app)
  return (
    <div className={`h-[70px] ml-[-63px] min-[600px]:ml-0 pl-[63px] pr-[10px] min-[600px]:pr-[29px] min-[600px]:px-[29px] lg:px-[59px] flex items-center fixed top-0 left-[63px] min-[1130px]:left-[240px] gap-2 sm:gap-4
    justify-between bg-[${headerColor}] z-50 ${!isTransparent && 'backdrop-blur-[50px]'}  shadow-[0_3px_5px_rgba(0,0,0,0.08)]
    ${isShowPlaylist ? 'right-0 2xl:right-[329px]' : 'right-0'}
    `}>
      <div className='flex w-full items-center gap-5'>
        <div className='hidden md:flex gap-5 text-[#616161]'>
          <span><BsArrowLeft size={24} /></span>
          <span><BsArrowRight size={24} /></span>
        </div>
        <div className='flex flex-auto'>
          <HeaderSearch />
        </div>
      </div>
      <div className='flex justify-between gap-3'>
        <div className='h-10 hidden lg:flex min-w-[175px]'>
          <button className='flex items-center justify-center text-[#c273ed] bg-[hsla(0,0%,100%,0.1)] py-[10px] px-[20px] rounded-full cursor-pointer'>
            <span className='mr-[6px]'><VscDesktopDownload size={20} /></span>
            <span className='font-semibold text-[14px]'>Tải bản macOS</span>
          </button>
        </div>
        <div>
          <button className='h-10 w-10 rounded-full bg-[hsla(0,0%,100%,0.1)] hidden min-[888px]:flex items-center justify-center text-[#d8d8d8]'>
            <TbShirt size={20} />
          </button>
        </div>
        <div>
          <button className='h-10 w-10 rounded-full bg-[hsla(0,0%,100%,0.1)] hidden min-[888px]:flex items-center justify-center text-[#d8d8d8]'>
            <RiVipDiamondLine size={18} />
          </button>
        </div>
        <div>
          <button className='h-10 w-10 rounded-full bg-[hsla(0,0%,100%,0.1)] flex items-center justify-center text-[#d8d8d8]'>
            <FiSettings size={18} />
          </button>
        </div>
        <div>
          <button className='hidden min-[600px]:flex items-center justify-center h-10 w-10'>
            <img
              src='https://thuthuatnhanh.com/wp-content/uploads/2019/07/hinh-hot-girl-trung-quoc-trang-phuc-kiem-hiep.jpg'
              alt='avatar user'
              className='h-10 w-10 rounded-full object-cover object-top'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)