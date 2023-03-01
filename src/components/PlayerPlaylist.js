import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'

import icons from '../ultis/icons'
import PlayerSong from './PlayerSong'


const { CiAlarmOn, BsThreeDots } = icons
const style = 'py-[5px] flex flex-1 items-center justify-center rounded-full text-grey-#a0a0a0'
const styleActived = 'py-[5px] flex flex-1 items-center justify-center rounded-full text-white  bg-black-#ffffff4d'

const PlayerPlaylist = () => {
  const { curSongId, curPlaylist, history } = useSelector(state => state.music)
  const [playlistState, setPlaylistState] = useState('normal')
  const [playlist, setPlaylist] = useState(curPlaylist)

  const hanndleTogglePlaylist = () => {
    playlistState === 'normal' ? setPlaylistState('history') : setPlaylistState('normal')
  }

  // useEffect(()=>{
  //   playlistState === 'normal' ? setPlaylist(curPlaylist) : setPlaylist
  // },[playlistState])


  console.log(history)
  return (
    <div className='w-full h-full pb-[90px] animate-slide-left'>
      <header className='px-2 py-[14px] flex justify-between items-center gap-2'>
        <div className='flex flex-1 items-center justify-center rounded-full bg-black-#ffffff1a cursor-pointer p-[3px]'>
          <div onClick={hanndleTogglePlaylist} className={playlistState === 'history' ? style : styleActived}>
            <h6 className=' text-xs font-medium'>Danh sách phát</h6>
          </div>
          <div onClick={hanndleTogglePlaylist} className={playlistState === 'history' ? styleActived : style}>
            <h6 className='text-xs font-medium'>Nghe gần đây</h6>
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
          {playlistState === 'normal' && curPlaylist?.songs?.map((song, index) => (
            <PlayerSong
              key={song?.encodeId}
              song={song}
              prev={(index < curPlaylist?.songs?.findIndex(song => song?.encodeId === curSongId)) ? true : false}
              title={curPlaylist?.title}
              link={curPlaylist?.link?.split('.')[0]}
            />
          ))}
          {playlistState === 'history' && history?.songs?.slice().reverse().map((song, index) => (
            <PlayerSong
              key={song?.encodeId}
              song={song}
              prev={false}
              isHistory={true}
              setPlaylistState={setPlaylistState}
            />
          ))}
        </Scrollbars >
      </div>
    </div>
  )
}

export default PlayerPlaylist