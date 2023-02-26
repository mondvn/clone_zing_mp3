import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import icons from '../ultis/icons'
import * as actions from '../store/actions'
// import * as apis from '../apis'
import { Link } from 'react-router-dom'


const { BsFillPlayFill } = icons

const PlayerSong = ({ song, prev, title, link }) => {
  const dispatch = useDispatch()
  const { isPlaying, curSongId } = useSelector(state => state.music)

  return (
    <>
      <div
        className={` rounded-[4px] text-player-text-color text-xs
      flex items-center justify-between p-[10px] group
      ${(prev && song?.encodeId !== curSongId) && 'opacity-40'}
      ${song?.encodeId === curSongId ? 'bg-pink-#9b4de0' : 'hover:bg-black-#ffffff1a'}`}
      >
        <div className='flex gap-[10px] items-center justify-start flex-1'>
          <div className='relative h-10 w-10'
            onClick={() => {
              dispatch(actions.setCurSongId(song?.encodeId))
              // dispatch(actions.setCurPlaylistId(pid))
              // fetchCurrentPlaylist()
              dispatch(actions.togglePlayMusic(false))
            }}
          >
            <img src={song?.thumbnail}
              alt='song thumb'
              className='h-10 w-10 rounded-sm object-cover'
            />
            <div className={`absolute w-full h-full top-0 left-0 bg-[#00000080] ${song?.encodeId === curSongId ? 'flex' : 'hidden group-hover:flex'}`}></div>

            <div className={`absolute w-full h-full top-0 left-0 items-center justify-center flex`}>
              <button className='text-white flex items-center justify-center'>
                {(song?.encodeId === curSongId && isPlaying) &&
                  <div className='w-5 h-5 flex items-center justify-center'>
                    <img
                      src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                      alt='gif playing'
                      className='w-5 h-5'
                    />
                  </div>}
                {(song?.encodeId === curSongId && !isPlaying) &&
                  <div className='w-5 h-5 flex items-center justify-center'>
                    <BsFillPlayFill size={24} />
                  </div>}
              </button>
              {song?.encodeId !== curSongId &&
                <button className='text-white items-center justify-center hidden group-hover:flex '>
                  <BsFillPlayFill size={24} />
                </button>}
            </div>
          </div>
          <div className='flex flex-col flex-1 justify-between'>
            <div className='flex justify-start text-sm text-primary-text-color w-[85%] gap-[6px]'>
              <div className='line-clamp-1'>{song?.title}</div>
            </div>
            <h3 className='flex justify-start'>
              <div className='line-clamp-1'>
                {song?.artists?.map((artist) => (
                  <div className='hover:text-pink-#c86dd7 hover:underline inline-block mr-1' key={artist?.id}>
                    <Link to={artist?.link}>{artist?.name}</Link>
                  </div>
                ))}
              </div>
            </h3>
          </div>
        </div>
      </div>
      {song?.encodeId === curSongId &&
        <div className='pt-[15px] pb-[10px] flex flex-col text-sm'>
          <h3 className='text-white'>Tiếp theo</h3>
          <h3 className='flex gap-1 w-full'>
            <span className='text-black-#FFFFFF80'>Từ playlist</span>
            <Link to={link} className='text-pink-#9b4de0'>{title?.length > 20 ? `${title?.slice(0, 20)}...` : title}</Link>
          </h3>
        </div>}
    </>
  )
}

export default memo(PlayerSong)