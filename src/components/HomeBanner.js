import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";

const HomeBanner = ({ banner }) => {
  console.log(banner)
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
        modules={[Navigation]}
        className="mySwiper"
      >
        {banner?.map((item, index) => (
          <SwiperSlide>
            <img
              src={item.banner}
              alt='banner'
              key={item.encodeId}
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