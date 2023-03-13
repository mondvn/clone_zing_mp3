import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import * as apis from '../../apis'

const { AiOutlineRight, BsFillPlayFill } = icons

const HomeNewReleaseChart = ({ newReleaseCharts, title }) => {
  const dispatch = useDispatch()
  const { curSongId, isPlaying } = useSelector(state => state.music)
  // console.log(newReleaseCharts)

  const breakpoints = {
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 28,
    },
    680: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 28,
    },
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
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

  const handlePlay = (encodeId) => {
    fetchDetailSong(encodeId)
    dispatch(actions.setCurSongId(encodeId))
    dispatch(actions.clearPlaylistBeforeShuffle())
    dispatch(actions.togglePlayMusic(false))
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
          breakpoints={breakpoints}
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
              <div
                className={` flex bg-black-#ffffff1a rounded-[4px] p-[15px] text-player-text-color text-xs group
                ${!item?.isWorldWide && 'pointer-events-none'}`}
              >
                <div className='flex relative mr-[10px]' onClick={() => handlePlay(item?.encodeId)}>
                  <img src={item?.thumbnailM} alt='song thumb' className='w-[120px] h-[120px]  object-contain rounded-[4px]' />
                  <div className={`absolute w-full h-full top-0 left-0 bg-[#00000080] ${item?.encodeId === curSongId ? 'flex' : 'hidden group-hover:flex'}`}></div>

                  <div className={`absolute w-full h-full top-0 left-0 items-center justify-center flex`}>
                    <button className='text-white flex items-center justify-center'>
                      {(item?.encodeId === curSongId && isPlaying) &&
                        <div className='w-6 h-6 flex items-center justify-center'>
                          <img
                            src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                            alt='gif playing'
                            className='w-6 h-6'
                          />
                        </div>}
                      {(item?.encodeId === curSongId && !isPlaying) &&
                        <div className='w-7 h-7 flex items-center justify-center'>
                          <BsFillPlayFill size={28} />
                        </div>}
                    </button>
                    {item?.encodeId !== curSongId &&
                      <button className='text-white items-center justify-center hidden group-hover:flex '>
                        <BsFillPlayFill size={28} />
                      </button>}
                  </div>
                </div>
                <div className='flex-1 flex flex-col justify-between text-black-#FFFFFF80'>
                  <div className='flex flex-col'>
                    <h3 className='text-base font-bold text-white line-clamp-2'>{item?.title}</h3>
                    <h3 className='text-xs font-normal'>{item?.artistsNames}</h3>
                  </div>
                  <div className='flex items-end justify-between'>
                    <span className='text-white text-2xl lg:text-3xl min-[1330px]:text-[40px] leading-[0.9] font-black opacity-[0.4] stroke-white'>{`#${index + 1}`}</span>
                    <span className='text-xs min-[1330px]:text-sm'>
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