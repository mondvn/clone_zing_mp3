import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import icons from '../../ultis/icons'
import SongItem from './SongItem'
const { BiSort } = icons

const MyMusicSong = () => {
  const [listSong, setListSong] = useState([])
  const { playlistFavoriteSong } = useSelector(state => state.music)

  useEffect(() => {
    setListSong(playlistFavoriteSong)
  }, [playlistFavoriteSong])

  // console.log(listSong)
  return (
    <div className='flex flex-col w-full text-xs text-player-text-color mb-5'>
      <div className='flex justify-between items-center p-[10px] font-medium border-b border-black-#353535 leading-6'>
        <div className='flex gap-[10px] items-center '>
          <BiSort size={14} />
          BÀI HÁT
        </div>
        <div>ALBUM</div>
        <div>THỜI GIAN</div>
      </div>
      <div className='flex flex-col'>
        {listSong && listSong?.map(item => (
          <SongItem
            key={item.encodeId}
            song={item}
            isAlbum={false}
          />
        ))}
      </div>
    </div>
  )
}

export default MyMusicSong