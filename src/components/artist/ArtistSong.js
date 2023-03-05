import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'

const { BsFillPlayFill, AiOutlineRight } = icons

const ArtistSong = ({ songs }) => {
  const { isPlaying, curSongId, isShuffle, curPlaylist } = useSelector(state => state.music)
  const dispatch = useDispatch

  const handlePlaySong = (encodeId) => {
    dispatch(actions.setCurPlaylistId(''))
    if (curSongId === encodeId) {
      dispatch(actions.togglePlayMusic(!isPlaying))
    } else {
      dispatch(actions.setCurSongId(encodeId))
      if (isShuffle) {
        const arr = songs?.items?.filter(item => item.isWorldWide)
        const currentSongIndex = songs?.items?.findIndex(item => item.encodeId === encodeId)
        const data = {
          title: '',
          link: '',
          songs: arr
        }
        const dataShuffle = {
          ...data,
          songs: [
            songs?.items[currentSongIndex],
            ...arr.slice().filter(item => item.encodeId !== encodeId).sort(() => Math.random() - 0.5)
          ]
        }
        dispatch(actions.setCurPlaylist(dataShuffle))
        dispatch(actions.setPlaylistBeforeShuffle(data))
      } else {
        dispatch(actions.setCurPlaylist({
          ...curPlaylist,
          title: '',
          link: '',
          songs: [...songs?.items.filter(item => item.isWorldWide)]
        }))
      }
      dispatch(actions.togglePlayMusic(false))
    }
  }
  return (
    <div className='mt-[30px] flex flex-col'>
      <div className='mb-6 flex justify-between items-center'>
        <span className='text-xl text-white font-bold'>{songs?.title}</span>
        {songs.items.length > 6 && <Link
          to={songs?.link}
          className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
          Tất Cả
          <AiOutlineRight size={17} />
        </Link>}
      </div>
      <div className='grid grid-cols-2 gap-x-7'>
        {songs?.items?.slice(0, 6).map(item => (
          <div
            key={item.encodeId}
            className='flex items-center justify-between text-player-text-color p-[10px] text-xs group rounded-[4px] border-b border-black-#ffffff1a hover:bg-black-#ffffff1a'>
            <div className='flex items-center'>
              <div
                className='flex relative mr-[16px] cursor-pointer'
                onClick={() => handlePlaySong(item?.encodeId)}
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
              <div className='flex flex-col justify-evenly text-xs font-medium text-black-#FFFFFF80'>
                <div className='text-sm text-white font-semibold line-clamp-1'>{item.title}</div>
                <h3 className='flex gap-1'>
                  {item?.artists?.map((artist, index) => (
                    <Link key={artist?.id} className='hover:text-pink-#9b4de0'>{artist?.name}</Link>
                  ))}
                </h3>
              </div>
            </div>
            <div className='flex-none'>{moment.unix(item?.duration).format("mm:ss")}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(ArtistSong)