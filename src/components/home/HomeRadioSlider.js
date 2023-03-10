import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import { Link } from 'react-router-dom'

import icons from '../../ultis/icons'

const { AiOutlineRight } = icons

const HomeRadioSlider = ({ radios, title }) => {
  const breakpoints = {
    1350: {
      slidesPerView: 7,
      slidesPerGroup: 7,
      spaceBetween: 28,
    },
    1024: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 24,
    },
    660: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
    },
    520: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 16,
    },
    450: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
    },
    // 0: {
    //   slidesPerView: 1,
    //   slidesPerGroup: 1,
    // }
  }
  return (
    <div className='pt-[30px] flex flex-col'>
      <div className='flex mb-5 items-center justify-between'>
        <h3 className='text-white text-xl font-bold'>{title}</h3>
        <Link className='text-black-#FFFFFF80 text-sm font-medium flex items-center justify-center gap-1 hover:text-pink-#c273ed'>
          Tất Cả
          <AiOutlineRight size={18} />
        </Link>

      </div>
      <div>
        <Swiper
          // slidesPerView={7}
          // slidesPerGroup={7}
          // spaceBetween={28}
          breakpoints={breakpoints}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {radios?.map((item, index) => (
            <SwiperSlide className='flex flex-col' key={item?.encodeId}>
              <div className='relative'>
                <img
                  src={item?.program?.thumbnail}
                  alt='thubnail theme'
                  className='object-contain rounded-full'
                />
                <img
                  src={item?.host?.thumbnail}
                  alt='thubnail host'
                  className='absolute top-[85.3%] left-[85.3%] translate-x-[-70%] translate-y-[-70%] w-10 object-contain rounded-full'
                />
                <span
                  className='absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] text-[7px] text-white bg-red-600 rounded-sm px-[2px] py-[1px]'
                >
                  LIVE
                </span>
              </div>
              <div className='mt-5 flex flex-col justify-center items-center'>
                <h3 className='text-white text-base font-semibold'>{item?.host?.name}</h3>
                <h3 className='text-black-#FFFFFF80 text-xs font-normal'>
                  {item?.activeUsers}
                  <span> đang nghe</span>
                </h3>
              </div>


            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default HomeRadioSlider