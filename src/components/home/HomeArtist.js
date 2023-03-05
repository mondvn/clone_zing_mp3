import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import { Link } from 'react-router-dom'

import icons from '../../ultis/icons'
import { handleDevineNumber } from '../../ultis/fn';

// const { SlUserFollow } = icons

const { AiOutlineRight, AiOutlineLeft, SlUserFollow } = icons

const HomeArtist = ({ artists }) => {
  console.log(artists)
  return (
    <div className='pt-[30px] group'>
      <Swiper
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {artists?.map((item, index) => (
          <SwiperSlide key={item?.id}>
            <div className='flex flex-col items-center justify-center'>
              <Link to={item?.link.split('.')[0]} className='relative overflow-hidden rounded-full cursor-pointer group'>
                <img
                  src={item?.thumbnail}
                  alt='thumbnail'
                  className='w-full object-contain rounded-full shadow-sm transform transition duration-1000 scale-100  hover:scale-110 ease-in-out'
                />
              </Link>
              <Link to={item?.link.split('.')[0]} className='mt-3 mb-1'>
                <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{item?.name}</h4>
              </Link>
              <span className='text-xs font-medium text-black-#FFFFFF80'>{handleDevineNumber(item?.totalFollow)} quan tâm</span>
              <button className='py-[6px] px-[19px] mt-[15px] mb-5 flex items-center justify-center text-white text-xs font-normal bg-pink-#9b4de0 rounded-full gap-1'>
                <SlUserFollow size={12} />
                <span className='uppercase'>Quan tâm</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next group-hover:flex hover:brightness-[0.9] cursor-pointer z-40 hidden items-center justify-center absolute 
        top-1/3 right-0 transform -translate-y-1/2 rounded-full bg-white-#ffffff26 text-white w-[55px] h-[55px]">
          <AiOutlineRight size={28} />
        </div>
        <div className="swiper-button-prev group-hover:flex hover:brightness-[0.9] cursor-pointer z-40 hidden items-center justify-center absolute 
        top-1/3 left-0 transform -translate-y-1/2 rounded-full bg-white-#ffffff26 text-white w-[55px] h-[55px]">
          <AiOutlineLeft size={28} />
        </div>
      </Swiper>
      {/* HomeBanner */}
    </div>
  )
}

export default HomeArtist