import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import icons from '../../ultis/icons'
import { handleDevineNumber } from '../../ultis/fn'
import * as actions from '../../store/actions'
import * as apis from '../../apis'


const { BsFillPlayFill, BsDot } = icons

const SearchItem = ({ item }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { curSongId, isPlaying } = useSelector(state => state.music)

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

  const handleNavigate = (item) => {
    const Path = item.link.split('.')[0]
    navigate(Path)
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
    <div
      className={`
        flex text-player-text-color p-[10px] text-xs group rounded-[4px] hover:bg-black-#ffffff1a cursor-pointer`}
      onClick={(item?.playlistId || item?.textType) ? (() => handleNavigate(item)) : (() => handlePlay(item?.encodeId))}
    >
      <div className='flex relative mr-[10px]'>
        <img src={item?.thumbnail} alt='song thumb' className={`h-[52px] w-[52px] object-contain ${item?.playlistId ? 'rounded-full' : 'rounded-sm'}`} />

        {!item?.playlistId && !item?.textType && <div className={`absolute w-full h-full top-0 left-0 bg-[#00000080] ${item?.encodeId === curSongId ? 'flex' : 'hidden group-hover:flex'}`}></div>
        }
        {!item?.playlistId && !item?.textType && <div className={`absolute w-full h-full top-0 left-0 items-center justify-center flex`}>
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
        </div>}
      </div>
      <div className='flex flex-col justify-evenly text-xs font-medium text-black-#FFFFFF80'>
        <div className={`flex justify-start text-sm text-primary-text-color gap-[6px] cursor-pointer
        ${!item?.playlistId && !item?.textType && 'hover:text-pink-#c86dd7'}`}>
          <div className='line-clamp-1'>{item?.title || item?.name}</div>
          {/* <div className={`${!item?.isWorldWide ? 'flex' : 'hidden'} items-center justify-center text-yellow-300`}><RiVipCrown2Line size={16} /></div> */}
        </div>
        {item?.playlistId &&
          <h3 className='flex items-center'>
            <span>Nghệ sĩ</span>
            <BsDot size={16} />
            <span>{handleDevineNumber(item?.totalFollow)} quan tâm</span>
          </h3>}
        <h3 className='flex items-center'>
          {item?.textType && <span>Playlist</span>}
          {item?.textType && <BsDot size={16} />}
          <span>{item?.artistsNames}</span>
        </h3>
      </div>
    </div>
  )
}

export default SearchItem