import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { Autoplay } from "swiper";
import { toast } from 'react-toastify'

import icons from '../../ultis/icons'
import * as apis from '../../apis'
import * as actions from '../../store/actions'

const { AiOutlineRight, BsPlayCircle } = icons

const HomeCommonSlider = ({ sliders }) => {
  // console.log(sliders)
  const dispatch = useDispatch()
  const { isPlaying, curPlaylistId } = useSelector(state => state.music)

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

  const handlePlayAlbum = async (pid) => {
    const response = await apis.apiGetDetailPlaylist(pid)
    if (response?.data?.err === 0) {
      const playlistData = response?.data?.data
      const arr = playlistData?.song?.items?.filter(item => item.isWorldWide)
      if (arr.length === 0) {
        toast.warn('Phải nạp VIP mới nghe được ALbum/Playlist này :(')
        return
      }
      const randomNumber = Math.round(Math.random() * arr.length)
      // console.log('randomNumber', randomNumber)
      // console.log(playlistData?.song?.items[randomNumber])

      // Buoc 1: Xet shuffle = true
      dispatch(actions.toggleShuffle(true))
      // Buoc 2: Xet curSongId
      dispatch(actions.setCurSongId(arr[randomNumber].encodeId))
      // Buoc 3 xet curPlaylistId
      dispatch(actions.setCurPlaylistId(pid))
      // Buoc 4 xet CurPlaylist va playlistBeforeShuffe
      const data = {
        title: playlistData?.title,
        link: playlistData?.link,
        songs: arr
      }
      const dataShuffle = {
        ...data,
        songs: [
          arr[randomNumber],
          ...arr.slice().filter((_, index) => index !== randomNumber).sort(() => Math.random() - 0.5)
        ]
      }
      // console.log(data)
      // console.log(dataShuffle)
      dispatch(actions.setCurPlaylist(dataShuffle))
      dispatch(actions.setPlaylistBeforeShuffle(data))
      // Buoc 5 xet isPlay = false
      dispatch(actions.togglePlayMusic(false))
    }
  }

  const handleTogglePlay = () => {
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }

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

                <Link to={item?.link.split('.')[0]} className='relative overflow-hidden rounded-lg cursor-pointer group'>
                  <img
                    src={item?.thumbnailM}
                    alt='thumbnail'
                    className='w-full object-contain rounded-lg shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
                  />
                  {(!isPlaying || (isPlaying && item?.encodeId !== curPlaylistId)) && <div className='absolute w-full h-full top-0 left-0 bg-[#00000080] hidden group-hover:block'></div>}
                  <div
                    className={`absolute w-full h-full top-0 left-0 items-center justify-center hidden 
                      ${(!isPlaying || (isPlaying && item?.encodeId !== curPlaylistId)) && 'group-hover:flex'}`}>
                    <button
                      onClick={item?.encodeId === curPlaylistId ? handleTogglePlay : () => handlePlayAlbum(item?.encodeId)}
                      className='text-white flex items-center justify-center'>
                      <BsPlayCircle size={45} className='hover:brightness-[0.8]' />
                    </button>
                  </div>
                  <div className={`absolute w-full h-full top-0 left-0 items-center justify-center ${(isPlaying && item?.encodeId === curPlaylistId) ? 'flex' : 'hidden'}`}>
                    <button className='text-white flex items-center justify-center'>
                      <div onClick={handleTogglePlay} className='border border-white rounded-full w-11 h-11 flex items-center justify-center'>
                        <img
                          src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                          alt='gif playing'
                          className='w-5 h-5'
                        />
                      </div>
                    </button>
                  </div>
                </Link>
                <Link
                  to={item?.link.split('.')[0]}
                  className='mt-3 mb-1'
                >
                  <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{item?.title}</h4>
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