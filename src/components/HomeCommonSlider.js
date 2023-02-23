import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

import icons from '../ultis/icons'

const { AiOutlineRight } = icons

const HomeCommonSlider = ({ sliders }) => {
  // console.log(sliders)

  // Xử lý 1 số trường hợp swiper sẽ autoplay còn lại thì không
  let swiperParams = {}
  const swiperWithAutoplayParams = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 28,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  }

  const swiperWithOutAutoplayParams = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 28,
  }

  sliders?.sectionId === "hAlbum" ? swiperParams = { ...swiperWithAutoplayParams } : swiperParams = { ...swiperWithOutAutoplayParams }

  return (
    <div className='mt-12'>
      {sliders?.title &&
        <div className='flex mb-5 items-center justify-between'>
          <h3 className='text-white text-xl font-bold'>{sliders?.title}</h3>
          {sliders?.title === "Top 100" &&
            <Link
              to={sliders?.link}
              className='text-black-#FFFFFF80 text-sm font-medium flex items-center justify-center gap-1 hover:text-pink-#c273ed'
            >
              Tất Cả
              <AiOutlineRight size={18} />
            </Link>
          }
        </div>}
      <div className='flex'>
        <Swiper
          {...swiperParams}
          modules={[Autoplay]}
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
                  <h4 className='text-white text-sm font-bold line-clamp-1'>{item?.title}</h4>
                </Link>
                <h3 className='text-black-#FFFFFF80 text-sm font-normal line-clamp-2'>
                  {item?.sortDescription || item?.artistsNames}
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