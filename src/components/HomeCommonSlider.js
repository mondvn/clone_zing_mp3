import React from 'react'
import { Link } from 'react-router-dom'

import icons from '../ultis/icons'

const { AiOutlineRight } = icons

const HomeCommonSlider = ({ slider }) => {
  // console.log(slider)
  return (
    <div className='mt-12'>
      <div className='flex mb-5 items-center justify-between'>
        <h3 className='text-white text-xl font-bold'>{slider?.title}</h3>
        {slider?.items?.length > 5 &&
          <Link className='text-black-#FFFFFF80 text-sm font-medium flex items-center justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={18} />
          </Link>
        }
      </div>
      <div className='flex mx-[-14px]'>
        {slider?.items?.slice(0, 5).map(item => (
          <div className='w-[20%] mx-[14px] flex flex-col' key={item?.encodeId}>
            <Link>
              <img
                className='w-full h-full rounded-md'
                src={item?.thumbnail}
                alt='Hình nền slider'
              />
            </Link>
            <Link
              to={item?.link.split('.')[0]}
              className='mt-3 mb-1'
            >
              <h4 className='text-white text-sm font-bold'>{item?.title}</h4>
            </Link>
            <h3 className='text-black-#FFFFFF80 text-sm font-normal'>
              {item?.sortDescription?.length > 50 ? `${item?.sortDescription?.slice(0, 40)}...` : item?.sortDescription}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCommonSlider