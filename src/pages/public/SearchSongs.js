import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import * as apis from '../../apis'
import { Link } from 'react-router-dom'


const { BsFillPlayFill } = icons

const SearchSongs = () => {

  const { searchData, isPlaying, curSongId } = useSelector(state => state.music)
  const dispatch = useDispatch()

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
    if (encodeId !== curSongId) {
      fetchDetailSong(encodeId)
      dispatch(actions.setCurSongId(encodeId))
      dispatch(actions.clearPlaylistBeforeShuffle())
      dispatch(actions.togglePlayMusic(false))
    } else {
      dispatch(actions.togglePlayMusic(!isPlaying))
    }
  }
  return (
    <div className='mx-[29px] lg:mx-[59px]'>
      <div className='mt-7 mb-[10px] text-white text-xl font-bold'>Bài Hát</div>
      <div className='grid grid-cols-1'>
        {searchData?.songs?.map(item => (
          <div className='flex items-center justify-between text-player-text-color p-[10px] text-xs group rounded-[4px] border-b border-black-#ffffff1a hover:bg-black-#ffffff1a'>
            <div className='flex flex-1'>
              <div
                className='flex relative mr-[16px] cursor-pointer'
                onClick={() => handlePlay(item?.encodeId)}
              >
                <img src={item.thumbnail} alt='song thumb' className='h-[40px] w-[40px] object-contain rounded-sm' />
                <div className={`absolute w-full h-full top-0 left-0 rounded-sm bg-[#00000080] ${item.encodeId === curSongId ? 'flex' : 'hidden group-hover:flex'}`}></div>
                <div className={`absolute w-full h-full top-0 left-0 items-center justify-center flex`}>
                  <button className='text-white flex items-center justify-center'>
                    {(item.encodeId === curSongId && isPlaying) &&
                      <div className='w-6 h-6 flex items-center justify-center'>
                        <img
                          src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                          alt='gif playing'
                          className='w-6 h-6'
                        />
                      </div>}
                    {(item.encodeId === curSongId && !isPlaying) &&
                      <div className='w-7 h-7 flex items-center justify-center'>
                        <BsFillPlayFill size={28} />
                      </div>}
                  </button>
                  {item.encodeId !== curSongId &&
                    <button className='text-white items-center justify-center hidden group-hover:flex '>
                      <BsFillPlayFill size={28} />
                    </button>}
                </div>
              </div>
              <div className='flex flex-1 flex-col justify-evenly text-xs font-medium text-black-#FFFFFF80'>
                <div className='text-sm text-white font-semibold line-clamp-1'>{item.title}</div>
                <h3 className='flex gap-1'>
                  {item?.artists?.map((artist, index) => (
                    <Link key={artist?.id} className='hover:text-pink-#9b4de0'>{artist?.name}</Link>
                  ))}
                </h3>
              </div>
            </div>
            <Link to={item?.album?.link.split('.')[0]} className='hidden md:flex flex-start flex-1 text-xs text-black-#FFFFFF80 cursor-pointer hover:text-pink-#c86dd7'>
              {item?.album?.title}
            </Link>
            <div className='flex-none'>{moment.unix(item?.duration).format("mm:ss")}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchSongs