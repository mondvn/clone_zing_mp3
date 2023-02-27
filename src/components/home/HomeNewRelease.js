import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/vi'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import * as apis from '../../apis'

const { AiOutlineRight, BsFillPlayFill, RiVipCrown2Line } = icons
const activeStyle = 'text-white text-xs font-normal bg-pink-#9b4de0 px-6 py-[6px] border border-pink-#9b4de0 rounded-full uppercase hover:brightness-[0.9]'
const notActiveStyle = 'text-white text-xs font-normal px-6 py-[6px] border border-black-#ffffff1a rounded-full uppercase hover:brightness-[0.9]'

const HomeNewRelease = ({ newRelease, title }) => {
  // console.log(newRelease)
  // console.log('Home New Release: re-render')
  const dispatch = useDispatch()
  const { curSongId, isPlaying } = useSelector(state => state.music)
  const [buttonActive, setButtonActive] = useState('all')
  const [data, setData] = useState([newRelease?.all])

  const handleButtonFilter = (state) => {
    switch (state) {
      case 'all':
        setButtonActive('all')
        setData(newRelease?.all)
        break
      case 'vn':
        setButtonActive('vn')
        setData(newRelease?.vPop)
        break
      case 'worldwide':
        setButtonActive('worldwide')
        setData(newRelease?.others)
        break
      default:
        break;
    }
  }

  // Xử lý lần đầu mount sẽ có dữ liệu luôn
  useEffect(() => {
    setData(newRelease?.all)
  }, [newRelease])

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
    <div className='mt-12 mb-5'>
      <header className='flex mb-5 items-center justify-between'>
        <h3 className='text-white text-xl font-bold'>{title}</h3>
      </header>
      <div className='flex flex-col'>
        <header className='flex w-full justify-between mb-4'>
          <div className='flex items-center justify-between gap-[15px]'>
            <button
              className={buttonActive === 'all' ? activeStyle : notActiveStyle}
              onClick={() => handleButtonFilter('all')}
            >
              Tất Cả
            </button>
            <button
              className={buttonActive === 'vn' ? activeStyle : notActiveStyle}
              onClick={() => handleButtonFilter('vn')}
            >
              Việt Nam
            </button>
            <button
              className={buttonActive === 'worldwide' ? activeStyle : notActiveStyle}
              onClick={() => handleButtonFilter('worldwide')}
            >
              Quốc Tế
            </button>
          </div>
          <Link className='text-black-#FFFFFF80 text-sm font-medium flex items-center justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={18} />
          </Link>
        </header>
        <div className='grid grid-cols-3 gap-x-[28px] rounded-md'>
          {data?.slice(0, 12).map((item, index) => (
            <div
              className={`
              ${!item?.isWorldWide && 'pointer-events-none'} 
              flex text-player-text-color p-[10px] text-xs group
              ${item?.encodeId === curSongId ? 'bg-black-#ffffff1a' : 'hover:bg-black-#ffffff1a'}`}
              key={index}>
              <div className='flex relative mr-[10px]' onClick={() => handlePlay(item?.encodeId)}>
                <img src={item?.thumbnail} alt='song thumb' className='h-[60px] w-[60px] rounded-sm object-contain' />

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
              <div className='flex flex-col justify-between text-xs font-medium text-black-#FFFFFF80'>
                <div className='flex justify-start text-sm text-primary-text-color gap-[6px]'>
                  <div className='line-clamp-1'>{item?.title}</div>
                  <div className={`${!item?.isWorldWide ? 'flex' : 'hidden'} items-center justify-center text-yellow-300`}><RiVipCrown2Line size={16} /></div>
                </div>
                <h3 className='flex gap-1'>
                  {item?.artists?.map((artist, index) => (
                    <Link key={artist?.id} className='hover:text-pink-#9b4de0'>{artist?.name}</Link>
                  ))}
                </h3>
                <span className='capitalize'>{moment.unix(item?.releaseDate).fromNow()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeNewRelease