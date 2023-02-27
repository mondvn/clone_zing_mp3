import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import * as apis from '../../apis'


const { CiMusicNote1, RiVipCrown2Line, BsFillPlayFill } = icons

const AlbumSong = ({ song, isAlbum, pid }) => {
  console.log('AlbumSong Component re-render')
  // console.log(isAlbum)

  const dispatch = useDispatch()
  const { curSongId, curPlaylistId, isPlaying, isShuffle } = useSelector(state => state.music)

  const fetchCurrentPlaylist = async () => {
    const response = await apis.apiGetDetailPlaylist(pid)
    if (response?.data?.err === 0) {
      console.log(response?.data?.data)
      const data = {
        title: response?.data?.data?.title,
        link: response?.data?.data?.link,
        songs: response?.data?.data?.song?.items?.filter(item => item.isWorldWide)
      }
      dispatch(actions.setCurPlaylist(data))
    }
  }

  const fetchCurrentPlaylistWithShuffle = async () => {
    const response = await apis.apiGetDetailPlaylist(pid)
    if (response?.data?.err === 0) {
      const arr = response?.data?.data?.song?.items?.filter(item => item.isWorldWide)
      const currentSongIndex = response?.data?.data?.song?.items?.findIndex(item => item.encodeId === song?.encodeId)

      const data = {
        title: response?.data?.data?.title,
        link: response?.data?.data?.link,
        songs: arr
      }
      const dataShuffle = {
        ...data,
        songs: [
          response?.data?.data?.song?.items[currentSongIndex],
          ...arr.slice().filter(item => item.encodeId !== song?.encodeId).sort(() => Math.random() - 0.5)
        ]
      }
      dispatch(actions.setCurPlaylist(dataShuffle))
      dispatch(actions.setPlaylistBeforeShuffle(data))
    }
  }

  const handlePlaySong = () => {
    dispatch(actions.setCurSongId(song?.encodeId))

    if (pid !== curPlaylistId) {
      dispatch(actions.setCurPlaylistId(pid))
    }
    isShuffle ? fetchCurrentPlaylistWithShuffle() : fetchCurrentPlaylist()

    dispatch(actions.togglePlayMusic(false))
  }

  return (
    <div
      className={`
      ${!song?.isWorldWide && 'pointer-events-none'} 
        flex items-center justify-between text-player-text-color p-[10px] text-xs border-b border-black-#353535 group
        ${song?.encodeId === curSongId ? 'bg-black-#ffffff1a' : 'hover:bg-black-#ffffff1a'}`}
    >
      <div className='flex gap-[10px] items-center justify-start flex-1'>
        <CiMusicNote1 size={14} />
        <div className='relative h-10 w-10'
          onClick={handlePlaySong}
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