import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify'
import moment from 'moment'

import { WrapperButton } from './Popper';
import * as actions from '../store/actions'
import icons from '../ultis/icons'


const { BsFillPlayFill, SlHeart, AiFillHeart } = icons

const PlayerSong = ({ song, prev, title, link, isHistory, setPlaylistState, isShowDuration }) => {
  const dispatch = useDispatch()
  const { isPlaying, curSongId, curPlaylist, history, playlistFavoriteSong } = useSelector(state => state.music)
  const [playlistFavoriteOnlyEncodeID, setplaylistFavoriteOnlyEncodeID] = useState([])

  useEffect(() => {
    if (playlistFavoriteSong) {
      const arr = playlistFavoriteSong.map(item => item.encodeId)
      setplaylistFavoriteOnlyEncodeID(arr)
    }
  }, [playlistFavoriteSong])

  const handlePlay = () => {
    if (song?.encodeId === curSongId) {
      dispatch(actions.togglePlayMusic(!isPlaying))
    } else {
      if (!isHistory) {
        dispatch(actions.setCurSongId(song?.encodeId))
        dispatch(actions.togglePlayMusic(false))
      } else {
        // console.log(history?.songs)
        const currentSongIndex = history?.songs?.findIndex(item => item.encodeId === song?.encodeId)
        // console.log(history?.songs[currentSongIndex])
        dispatch(actions.setCurPlaylist({
          ...curPlaylist,
          title: '',
          link: '',
          songs: [history?.songs[currentSongIndex],
          ...history?.songs.slice().filter(item => item.encodeId !== song?.encodeId).reverse()]
        }))
        dispatch(actions.setCurSongId(song?.encodeId))
        dispatch(actions.togglePlayMusic(false))
        setPlaylistState('normal')
      }
    }
  }
  const handleAddFavoriteSong = () => {
    dispatch(actions.addFavoriteSong(song))
    toast('Thêm bài hát vào thư viên thành công')

  }

  const handleDelFavoriteSong = () => {
    dispatch(actions.delFavoriteSong(song?.encodeId))
    toast('Xóa bài hát khỏi thư viên thành công')
  }

  return (
    <>
      <div
        className={`relative rounded-[4px] text-player-text-color text-xs flex items-center justify-between p-[10px] group
      ${(prev && song?.encodeId !== curSongId) && 'opacity-40'}
      ${song?.encodeId === curSongId ? 'bg-pink-#9b4de0' : 'hover:bg-black-#ffffff1a'}`}
      >
        <div className='absolute z-10 w-1/4 top-0 bottom-0 right-0 items-center justify-end hidden group-hover:flex '>
          <Tippy placement='top' delay={[0, 50]}
            render={attrs => (
              <WrapperButton>
                {playlistFavoriteOnlyEncodeID.includes(song?.encodeId) ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'}
              </WrapperButton>
            )}>
            <div onClick={playlistFavoriteOnlyEncodeID.includes(song?.encodeId) ? handleDelFavoriteSong : handleAddFavoriteSong}
              className=' flex items-center justify-center hover:bg-[#2d2d2d] rounded-full mr-5'>
              <div className='px-[8px] py-[8px]'>
                {playlistFavoriteOnlyEncodeID.includes(song?.encodeId)
                  ? <AiFillHeart className='text-pink-#9b4de0' size={16} />
                  : <SlHeart className='text-white' size={16} />}
              </div>
            </div>
          </Tippy>
        </div>
        <div className='flex gap-[10px] items-center justify-start flex-1'>
          <div className='relative h-10 w-10'
            onClick={handlePlay}
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
        {isShowDuration && <div className='flex-none group-hover:hidden'>{moment.unix(song?.duration).format("mm:ss")}</div>}
      </div>
      {(song?.encodeId === curSongId && curSongId !== curPlaylist?.songs[curPlaylist?.songs.length - 1]?.encodeId) &&
        <div className='pt-[15px] pb-[10px] flex flex-col text-sm'>
          <h3 className='text-white'>Tiếp theo</h3>
          {link &&
            <h3 className='flex gap-1 w-full'>
              <span className='text-black-#FFFFFF80'>Từ playlist</span>
              <Link to={link} className='text-pink-#9b4de0'>{title?.length > 30 ? `${title?.slice(0, 30)}...` : title}</Link>
            </h3>}
        </div>}
    </>
  )
}

export default memo(PlayerSong)