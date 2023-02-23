import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as actions from '../store/actions'
import icons from '../ultis/icons'

const { AiOutlineRight, AiOutlineLeft } = icons

const HomeBanner = ({ banners }) => {
  // console.log(banners)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickBanner = (item) => {
    // console.log({ item })
    if (item.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId))
      dispatch(actions.togglePlayMusic(false))
    } else if (item.type === 4) {
      const albumPath = item.link.split('.')[0]
      navigate(albumPath)
    }

  }
  return (
    <div className='pt-[30px] group'>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {banners?.map((item, index) => (
          <SwiperSlide key={item?.encodeId}>
            <img
              src={item?.banner}
              alt='banner'
              className='object-contain rounded-lg cursor-pointer'
              onClick={() => handleClickBanner(item)}
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next group-hover:flex hover:brightness-[0.9] cursor-pointer z-40 hidden items-center justify-center absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-white-#ffffff26 text-white w-[55px] h-[55px]">
          <AiOutlineRight size={28} />
        </div>
        <div className="swiper-button-prev group-hover:flex hover:brightness-[0.9] cursor-pointer z-40 hidden items-center justify-center absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-white-#ffffff26 text-white w-[55px] h-[55px]">
          <AiOutlineLeft size={28} />
        </div>
      </Swiper>
      {/* HomeBanner */}
    </div>
  )
}

export default HomeBanner