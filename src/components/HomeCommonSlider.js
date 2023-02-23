import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { } from "swiper";

import icons from '../ultis/icons'

const { AiOutlineRight } = icons

const HomeCommonSlider = ({ sliders }) => {
  // console.log(sliders)
  return (
    <div className='mt-12'>
      {sliders?.title &&
        <div className='flex mb-5 items-center justify-between'>
          <h3 className='text-white text-xl font-bold'>{sliders?.title}</h3>
          {/* {sliders?.items?.length > 5 &&
          <Link className='text-black-#FFFFFF80 text-sm font-medium flex items-center justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={18} />
          </Link>
        } */}
        </div>}
      {/* <div className='flex mx-[-14px]'>
        {sliders?.items?.slice(0, 5).map(item => (
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
      </div> */}
      <div className='flex'>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={28}
          modules={[]}
          className="mySwiper"
        >
          {sliders?.items?.map((item, index) => (
            <SwiperSlide key={item?.encodeId}>
              <div className='flex flex-col'>
                <Link>
                  <img
                    className='w-full h-full rounded-md'
                    src={item?.thumbnailM}
                    alt='Hình nền slider'
                  />
                </Link>
                <Link
                  to={item?.link.split('.')[0]}
                  className='mt-3 mb-1'
                >
                  <h4 className='text-white text-sm font-bold line-clamp-2'>{item?.title}</h4>
                </Link>
                <h3 className='text-black-#FFFFFF80 text-sm font-normal line-clamp-2'>
                  {item?.sortDescription}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default HomeCommonSlider