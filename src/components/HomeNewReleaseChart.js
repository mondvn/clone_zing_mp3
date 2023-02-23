import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { Link } from 'react-router-dom';
import moment from 'moment';

import icons from '../ultis/icons'

const { AiOutlineRight } = icons

const HomeNewReleaseChart = ({ newReleaseCharts, title }) => {
  console.log(newReleaseCharts)
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
          slidesPerView={3}
          slidesPerGroup={3}
          spaceBetween={28}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {newReleaseCharts?.map((item, index) => (
            <SwiperSlide key={item?.encodeId}>
              <div className='flex bg-black-#ffffff1a rounded-[4px] p-[15px]'>
                <img
                  src={item?.thumbnailM}
                  alt='thumbnal'
                  className='w-[120px] object-contain rounded-[4px] mr-[10px]'

                />
                <div className='flex-auto flex flex-col justify-between text-black-#FFFFFF80'>
                  <div className='flex flex-col'>
                    <h3 className='text-base font-bold text-white'>{item?.title}</h3>
                    <h3 className='text-xs font-normal'>{item?.artistsNames}</h3>
                  </div>
                  <div className='flex items-end justify-between'>
                    <span className='text-white text-[40px] leading-[0.9] font-black opacity-[0.4] stroke-white'>{`#${index + 1}`}</span>
                    <span className='text-sm'>
                      {moment.unix(item?.releaseDate).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className='flex bg-black-#ffffff1a rounded-[4px] p-[15px] items-center justify-center h-[150px]'>
              <div className='text-pink-#c86dd7 flex items-center justify-center'>Xem Tất Cả</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default HomeNewReleaseChart