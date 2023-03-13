import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as actions from '../../store/actions'
import * as apis from '../../apis'
import icons from '../../ultis/icons'

const { AiOutlineRight, AiOutlineLeft } = icons

const HomeBanner = ({ banners }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const breakpoints = {
    1024: {
      slidesPerView: 3,
      centeredSlides: true

    },
    768: {
      slidesPerView: 2,
      centeredSlides: false

    },
    0: {
      slidesPerView: 1,
      centeredSlide: true
    }
  }

  const fetchDetailSong = async (encodeId) => {
    const response = await apis.apiGetInfoSong(encodeId)
    if (response?.data?.err === 0) {
      const data = {
        title: '',
        link: '',
        songs: [response?.data?.data]
      }
      dispatch(actions.setCurPlaylist(data))
    }
  }

  const handleClickBanner = (item) => {
    // console.log({ item })
    if (item.type === 1) {
      fetchDetailSong(item.encodeId)
      dispatch(actions.setCurSongId(item.encodeId))
      dispatch(actions.clearPlaylistBeforeShuffle())
      dispatch(actions.togglePlayMusic(false))
    } else if (item.type === 4) {
      const albumPath = item.link.split('.')[0]
      navigate(albumPath)
    }

  }
  return (

    <div className='pt-[30px] group'>
      <Swiper
        spaceBetween={30}
        loop={true}
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
        breakpoints={breakpoints}
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
    </div>
  )
}

export default HomeBanner