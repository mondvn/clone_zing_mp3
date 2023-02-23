import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";

const HomeBanner = ({ banners }) => {
  // console.log(banners)
  return (
    <div className='pt-[30px]'>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {banners?.map((item, index) => (
          <SwiperSlide key={item?.encodeId}>
            <img
              src={item?.banner}
              alt='banner'
              className='object-contain rounded-lg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* HomeBanner */}
    </div>
  )
}

export default HomeBanner