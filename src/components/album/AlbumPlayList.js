import { memo } from 'react'
import moment from 'moment'

import { AlbumSong } from './'
import icons from '../../ultis/icons'

const { BiSort, BsDot } = icons

const AlbumPlayList = ({ songs, isAlbum, pid }) => {
  // console.log({ songs })
  console.log('AlbumPlayList Component re-render')

  return (
    <div className='flex flex-col w-full text-xs text-player-text-color mb-5'>
      <div className='flex justify-between items-center p-[10px] font-medium border-b border-player-border-color leading-6'>
        <div className='flex gap-[10px] items-center '>
          <BiSort size={14} />
          BÀI HÁT
        </div>
        {!isAlbum && <div>ALBUM</div>}
        <div>THỜI GIAN</div>
      </div>
      <div className='flex flex-col'>
        {songs?.items?.map(item => (
          <AlbumSong
            key={item.encodeId}
            song={item}
            isAlbum={isAlbum}
            pid={pid}
          />
        ))}
      </div>
      <div className='flex gap-1 items-center mt-[10px]'>
        <span>{`${songs?.total} bài hát`}</span>
        <BsDot size={24} />
        <span>{moment.utc(songs?.totalDuration * 1000).format("H [giờ] m [phút]")}</span>
      </div>
    </div>
  )
}

export default memo(AlbumPlayList)