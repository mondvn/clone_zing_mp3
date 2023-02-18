import { memo } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import icons from '../ultis/icons'
import * as actions from '../store/actions'

const { CiMusicNote1 } = icons

const AlbumSong = ({ song }) => {
  const dispatch = useDispatch()

  // console.log('AlbumSong component', song)
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(song?.encodeId))
        dispatch(actions.togglePlayMusic(false))
      }}
      className='flex items-center justify-between text-player-text-color p-[10px] text-xs border-b border-player-border-color hover:bg-black-#ffffff1a cursor-pointer'>
      <div className='flex gap-[10px] items-center justify-start flex-1'>
        <CiMusicNote1 size={14} />
        <img src={song?.thumbnail}
          alt='song thumb'
          className='h-10 w-10 rounded-sm object-cover'
        />
        <div className='flex flex-col justify-between'>
          <div className='text-sm text-primary-text-color'>{song?.title?.length > 30 ? `${song?.title?.slice(0, 30)}...` : song?.title}</div>
          <h3 className=''>{song?.artistsNames?.length > 34 ? `${song?.artistsNames?.slice(0, 34)}...` : song?.artistsNames}</h3>
        </div>
      </div>
      <div className='flex-1 flex-start'>
        {song?.album?.title?.length > 45 ? `${song?.album?.title?.slice(0, 45)}...` : song?.album?.title}
      </div>
      <div className='flex-none'>{moment.unix(song?.duration).format("mm:ss")}</div>
    </div>
  )
}

export default memo(AlbumSong)