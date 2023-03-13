import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

import icons from '../../ultis/icons'
import AlbumItem from '../common/AlbumItem';

const { AiOutlineRight } = icons

const HomeCommonSlider = ({ sliders }) => {

  // Xử lý 1 số trường hợp swiper sẽ autoplay còn lại thì không
  let swiperParams = {}
  const swiperWithOutAutoplayParams = {}
  const swiperWithAutoplayParams = {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  }

  const breakpoints = {
    1350: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 28,
    },
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 24,
    },
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
    },
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    }
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
          breakpoints={breakpoints}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {sliders?.items?.map(item => (
            <SwiperSlide key={item?.encodeId}>
              <AlbumItem albumData={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default memo(HomeCommonSlider)