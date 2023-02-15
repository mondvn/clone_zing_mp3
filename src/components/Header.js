import React from 'react'

import icons from '../ultis/icons'
import Search from './Search'

const { BsArrowLeft, BsArrowRight, VscDesktopDownload, TbShirt, RiVipDiamondLine, FiSettings } = icons

const Header = () => {
  return (
    <div className="h-[70px] px-[59px] flex items-center fixed w-[calc(100%-569px)] justify-between">
      <div className='flex items-center gap-5'>
        <div className='flex gap-5 text-[#616161]'>
          <span><BsArrowLeft size={24} /></span>
          <span><BsArrowRight size={24} /></span>
        </div>
        <div className=''>
          <Search />
        </div>
      </div>
      <div className='flex justify-between gap-3'>
        <div className='h-10 w-[175px]'>
          <div className='flex items-center justify-center text-[#c273ed] bg-[hsla(0,0%,100%,0.1)] py-[10px] px-[20px] rounded-full cursor-pointer'>
            <span className='mr-[6px]'><VscDesktopDownload size={20} /></span>
            <span className='font-semibold text-[14px]'>Tải bản macOS</span>
          </div>
        </div>
        <div>
          <button className='h-10 w-10 rounded-full bg-[hsla(0,0%,100%,0.1)] flex items-center justify-center text-[#d8d8d8]'>
            <TbShirt size={20} />
          </button>
        </div>
        <div>
          <button className='h-10 w-10 rounded-full bg-[hsla(0,0%,100%,0.1)] flex items-center justify-center text-[#d8d8d8]'>
            <RiVipDiamondLine size={18} />
          </button>
        </div>
        <div>
          <button className='h-10 w-10 rounded-full bg-[hsla(0,0%,100%,0.1)] flex items-center justify-center text-[#d8d8d8]'>
            <FiSettings size={18} />
          </button>
        </div>
        <div>
          <button className='flex items-center justify-center'>
            {/* <FiSettings size={18} /> */}
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

export default Header