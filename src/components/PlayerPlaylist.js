import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'

import icons from '../ultis/icons'
import PlayerSong from './PlayerSong'


const { CiAlarmOn, BsThreeDots } = icons

const PlayerPlaylist = () => {
  const { curSongId, curPlaylist } = useSelector(state => state.music)

  // console.log(curPlaylist)
  return (
    <div className='w-full h-full'>
      <header className='px-2 py-[14px] flex justify-between items-center gap-2'>
        <div className='flex flex-1 items-center justify-center rounded-full bg-black-#ffffff1a cursor-pointer p-[3px]'>
          <div className='py-[5px] bg-black-#ffffff4d flex flex-1 items-center justify-center rounded-full'>
            <h6 className='text-white text-xs font-medium'>Danh sách phát</h6>
          </div>
          <div className='py-[5px] flex flex-1 items-center justify-center rounded-full'>
            <h6 className='text-grey-#a0a0a0 text-xs font-medium'>Nghe gần đây</h6>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <div className=' flex items-center justify-center text-primary-text-color bg-[#2d2d2d] rounded-full cursor-pointer'>
            <div className='px-[8px] py-[8px]'>
              <CiAlarmOn size={16} />
            </div>
          </div>
          <div className='flex items-center justify-center text-primary-text-color bg-[#2d2d2d] rounded-full cursor-pointer'>
            <div className='px-[8px] py-[8px]'>
              <BsThreeDots size={16} />
            </div>
          </div>
        </div>
      </header>
      <div className='flex flex-col px-2 w-full h-full'>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          {curPlaylist?.songs?.map((song, index) => (
            <PlayerSong
              key={song?.encodeId}
              song={song}
              prev={(index < curPlaylist?.songs?.findIndex(song => song?.encodeId === curSongId)) ? true : false}
              title={curPlaylist?.title}
              link={curPlaylist?.link?.split('.')[0]}
            />
          ))}
        </Scrollbars >
      </div>
    </div>
  )
}

export default PlayerPlaylist