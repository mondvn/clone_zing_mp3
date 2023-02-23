import { memo } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import icons from '../ultis/icons'
import * as actions from '../store/actions'

const { CiMusicNote1, RiVipCrown2Line } = icons

const AlbumSong = ({ song }) => {
  const dispatch = useDispatch()

  // console.log('AlbumSong component', song)
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(song?.encodeId))
        dispatch(actions.togglePlayMusic(false))
      }}
      className={`${song?.isWorldWide ? 'cursor-pointer' : 'pointer-events-none'} flex items-center justify-between text-player-text-color p-[10px] text-xs border-b border-player-border-color hover:bg-black-#ffffff1a`}>
      <div className='flex gap-[10px] items-center justify-start flex-1'>
        <CiMusicNote1 size={14} />
        <img src={song?.thumbnail}
          alt='song thumb'
          className='h-10 w-10 rounded-sm object-cover'
        />
        <div className='flex flex-col justify-between'>
          <div className='flex justify-start text-sm text-primary-text-color gap-[6px] line-clamp-1'>
            {song?.title}
            <div className={`${!song?.isWorldWide ? 'block' : 'hidden'} flex text-yellow-300`}><RiVipCrown2Line size={16} /></div>
          </div>
          <h3 className='line-clamp-1'>{song?.artistsNames}</h3>
        </div>
      </div>
      <div className='flex-1 flex-start line-clamp-1'>
        {song?.album?.title}
      </div>
      <div className='flex-none'>{moment.unix(song?.duration).format("mm:ss")}</div>
    </div>
  )
}

export default memo(AlbumSong)