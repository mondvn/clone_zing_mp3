import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom'

const { CiMusicNote1, RiVipCrown2Line, BsFillPlayFill } = icons

const AlbumSong = ({ song, isAlbum }) => {
  console.log('AlbumSong Component re-render')

  const dispatch = useDispatch()
  const { curSongId, isPlaying } = useSelector(state => state.music)
  return (
    <div
      className={`
      ${!song?.isWorldWide && 'pointer-events-none'} 
        flex items-center justify-between text-player-text-color p-[10px] text-xs border-b border-player-border-color group
        ${song?.encodeId === curSongId ? 'bg-black-#ffffff1a' : 'hover:bg-black-#ffffff1a'}`}
    >
      <div className='flex gap-[10px] items-center justify-start flex-1'>
        <CiMusicNote1 size={14} />
        <div className='relative h-10 w-10'
          onClick={() => {
            dispatch(actions.setCurSongId(song?.encodeId))
            dispatch(actions.togglePlayMusic(!isPlaying))
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
            <div className={`${!song?.isWorldWide ? 'flex' : 'hidden'} items-center justify-center text-yellow-300`}><RiVipCrown2Line size={16} /></div>
          </div>
          <h3 className='flex justify-start'>
            <div className='line-clamp-1'>
              {song?.artists?.map((artist, index) => (
                <div className='hover:text-pink-#c86dd7 hover:underline inline-block mr-1' key={artist?.id}>
                  <Link to={artist?.link}>{artist?.name}</Link>
                </div>
              ))}
            </div>
          </h3>
        </div>
      </div>
      {!isAlbum && <div className='flex-1 line-clamp-1 hover:text-pink-#c86dd7 hover:underline'>
        <Link to={song?.album?.link.split('.')[0]}>{song?.album?.title}</Link>
      </div>}
      <div className='flex-none'>{moment.unix(song?.duration).format("mm:ss")}</div>
    </div>
  )
}

export default memo(AlbumSong)