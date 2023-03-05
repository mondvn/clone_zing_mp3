import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'

import icons from '../../ultis/icons'
import { handleDevineNumber } from '../../ultis/fn'
import * as actions from '../../store/actions'
import * as apis from '../../apis'
import { Link } from 'react-router-dom'


const { BsFillPlayFill, AiOutlineRight, BsPlayCircle, SlUserFollow } = icons

const SearchAll = () => {
  const { searchData, curSongId, isPlaying, curPlaylistId } = useSelector(state => state.music)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(searchData)

  const fetchDetailSong = async (encodeId) => {
    const response = await apis.apiGetInfoSong(encodeId)
    if (response?.data?.err === 0) {
      const data = {
        title: '',
        link: '',
        songs: [response?.data?.data]
      }
      dispatch(actions.setCurPlaylist(data))
    }
  }

  const handleNavigate = (item) => {
    const Path = item.link.split('.')[0]
    navigate(Path)
  }

  const handlePlay = (encodeId) => {
    if (encodeId !== curSongId) {
      fetchDetailSong(encodeId)
      dispatch(actions.setCurSongId(encodeId))
      dispatch(actions.clearPlaylistBeforeShuffle())
      dispatch(actions.togglePlayMusic(false))
    } else {
      dispatch(actions.togglePlayMusic(!isPlaying))
    }
  }

  const handlePlayAlbum = async (pid) => {
    const response = await apis.apiGetDetailPlaylist(pid)
    if (response?.data?.err === 0) {
      const playlistData = response?.data?.data
      const arr = playlistData?.song?.items?.filter(item => item.isWorldWide)
      if (arr.length === 0) {
        toast.warn('Phải nạp VIP mới nghe được ALbum/Playlist này :(')
        return
      }
      const randomNumber = Math.round(Math.random() * arr.length)

      // Buoc 1: Xet shuffle = true
      dispatch(actions.toggleShuffle(true))
      // Buoc 2: Xet curSongId
      dispatch(actions.setCurSongId(arr[randomNumber].encodeId))
      // Buoc 3 xet curPlaylistId
      dispatch(actions.setCurPlaylistId(pid))
      // Buoc 4 xet CurPlaylist va playlistBeforeShuffe
      const data = {
        title: playlistData?.title,
        link: playlistData?.link,
        songs: arr
      }
      const dataShuffle = {
        ...data,
        songs: [
          arr[randomNumber],
          ...arr.slice().filter((_, index) => index !== randomNumber).sort(() => Math.random() - 0.5)
        ]
      }
      // console.log(data)
      // console.log(dataShuffle)
      dispatch(actions.setCurPlaylist(dataShuffle))
      dispatch(actions.setPlaylistBeforeShuffle(data))
      // Buoc 5 xet isPlay = false
      dispatch(actions.togglePlayMusic(false))
    }
  }

  const handleTogglePlay = () => {
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }

  return (
    <div className='mx-[59px]'>
      <div className='mt-7 flex flex-col'>
        <div className='mb-5 text-white text-xl font-bold'>Nổi Bật</div>
        <div className='grid grid-cols-3 gap-x-7 rounded-md'>
          <div
            className='flex text-player-text-color p-[10px] text-xs group rounded-[4px] bg-[#292929] hover:bg-black-#ffffff1a cursor-pointer'
            onClick={() => handleNavigate(searchData?.artists[0])}
          >
            <div className='flex relative mr-[16px]'>
              <img src={searchData?.artists[0].thumbnail} alt='thumb' className='h-[84px] w-[84px] object-contain rounded-full' />
              <div className={`absolute w-full h-full top-0 left-0 rounded-full bg-[#00000080] ${searchData?.artists[0].encodeId === curSongId ? 'flex' : 'hidden group-hover:flex'}`}></div>
            </div>
            <div className='flex flex-col justify-evenly text-xs font-medium text-black-#FFFFFF80'>
              <span>Nghệ sĩ</span>
              <div className='text-sm text-white font-semibold line-clamp-1 hover:text-pink-#c86dd7'>{searchData?.artists[0].name}</div>
              <span>{handleDevineNumber(searchData?.artists[0].totalFollow)} quan tâm</span>
            </div>
          </div>
          {searchData?.songs.slice(0, 2).map(item => (
            <div
              className='flex text-player-text-color p-[10px] text-xs group rounded-[4px] bg-[#292929] hover:bg-black-#ffffff1a'
            >
              <div
                className='flex relative mr-[16px] cursor-pointer'
                onClick={() => handlePlay(item?.encodeId)}

              >
                <img src={item.thumbnail} alt='song thumb' className='h-[84px] w-[84px] object-contain rounded-sm' />
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
                <span>Bài hát</span>
                <div className='text-sm text-white font-semibold line-clamp-2'>{item.title}</div>
                <h3 className='flex gap-1'>
                  {item?.artists?.map((artist, index) => (
                    <Link key={artist?.id} className='hover:text-pink-#9b4de0'>{artist?.name}</Link>
                  ))}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-12 flex flex-col'>
        <div className='mb-5 flex justify-between items-center'>
          <span className='text-xl text-white font-bold'>Bài Hát</span>
          <Link className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={17} />
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-x-7'>
          {searchData?.songs.slice(0, 6).map(item => (
            <div className='flex items-center justify-between text-player-text-color p-[10px] text-xs group rounded-[4px] border-b border-black-#ffffff1a hover:bg-black-#ffffff1a'>
              <div className='flex items-center'>
                <div
                  className='flex relative mr-[16px] cursor-pointer'
                  onClick={() => handlePlay(item?.encodeId)}
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

      <div className='mt-12 flex flex-col'>
        <div className='mb-5 flex justify-between items-center'>
          <span className='text-xl text-white font-bold'>Playlist/Album</span>
          <Link className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={17} />
          </Link>
        </div>
        <div className='grid grid-cols-5 gap-x-7'>
          {searchData?.playlists.slice(0, 5).map(item => (
            <div key={item?.encodeId}>
              <div className='flex flex-col'>
                <Link to={item?.link.split('.')[0]} className='relative overflow-hidden rounded-lg cursor-pointer group'>
                  <img
                    src={item?.thumbnailM}
                    alt='thumbnail'
                    className='w-full object-contain rounded-lg shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
                  />
                  {(!isPlaying || (isPlaying && item?.encodeId !== curPlaylistId)) && <div className='absolute w-full h-full top-0 left-0 bg-[#00000080] hidden group-hover:block'></div>}
                  <div
                    className={`absolute w-full h-full top-0 left-0 items-center justify-center hidden 
                    ${(!isPlaying || (isPlaying && item?.encodeId !== curPlaylistId)) && 'group-hover:flex'}`}>
                    <button
                      onClick={item?.encodeId === curPlaylistId ? handleTogglePlay : () => handlePlayAlbum(item?.encodeId)}
                      className='text-white flex items-center justify-center'>
                      <BsPlayCircle size={45} className='hover:brightness-[0.8]' />
                    </button>
                  </div>
                  <div className={`absolute w-full h-full top-0 left-0 items-center justify-center ${(isPlaying && item?.encodeId === curPlaylistId) ? 'flex' : 'hidden'}`}>
                    <button className='text-white flex items-center justify-center'>
                      <div onClick={handleTogglePlay} className='border border-white rounded-full w-11 h-11 flex items-center justify-center'>
                        <img
                          src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                          alt='gif playing'
                          className='w-5 h-5'
                        />
                      </div>
                    </button>
                  </div>
                </Link>
                <Link
                  to={item?.link.split('.')[0]}
                  className='mt-3 mb-1'
                >
                  <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{item?.title}</h4>
                </Link>
                <h3 className='text-black-#FFFFFF80 text-sm font-normal line-clamp-2'>
                  {item?.artists?.map((artist, index) => (
                    <Link key={artist?.id} className='hover:text-pink-#9b4de0 mr-1'>{artist?.name}</Link>
                  ))}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-12 flex flex-col'>
        <div className='mb-5 flex justify-between items-center'>
          <span className='text-xl text-white font-bold'>Nghệ Sĩ/OA</span>
          <Link className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={17} />
          </Link>
        </div>
        <div className='grid grid-cols-5 gap-x-7'>
          {searchData?.artists.map(item => (
            <div key={item?.encodeId}>
              <div className='flex flex-col items-center justify-center'>
                <Link to={item?.link.split('.')[0]} className='relative overflow-hidden rounded-full cursor-pointer group'>
                  <img
                    src={item?.thumbnailM}
                    alt='thumbnail'
                    className='w-full object-contain rounded-full shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
                  />
                </Link>
                <Link to={item?.link.split('.')[0]} className='mt-3 mb-1'>
                  <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{item?.name}</h4>
                </Link>
                <span className='text-xs font-medium text-black-#FFFFFF80'>{handleDevineNumber(item?.totalFollow)} quan tâm</span>
                <button className='py-[6px] px-[19px] mt-[15px] mb-5 flex items-center justify-center text-white text-xs font-normal bg-pink-#9b4de0 rounded-full gap-1'>
                  <SlUserFollow size={12} />
                  <span className='uppercase'>Quan tâm</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default SearchAll