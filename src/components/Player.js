import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Tippy from '@tippyjs/react/headless';
import { WrapperButton } from '../components/Popper';
import { toast } from 'react-toastify'

import icons from '../ultis/icons'
import * as apis from '../apis'
import * as actions from '../store/actions'
import PlayerVolume from './PlayerVolume'

const { SlHeart, BsThreeDots, BsPlayCircle, MdSkipPrevious, MdSkipNext, TbRepeat, FiPauseCircle, RxShuffle, MdOutlineQueueMusic, TbRepeatOnce, AiFillHeart } = icons

const Player = () => {
  const { curSongId, isPlaying, curPlaylist, repeatValue, isShuffle, playlistBeforeShuffle, playlistFavoriteSong } = useSelector(state => state.music)
  const { isShowPlaylist } = useSelector(state => state.app)
  const [songInfo, setSongInfo] = useState(null)
  const [percentage, setPercentage] = useState(0)
  const [thumbMarginLeft, setThumbMarginLeft] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [playlistFavoriteOnlyEncodeID, setplaylistFavoriteOnlyEncodeID] = useState([])

  const rangeRef = useRef()
  const dispatch = useDispatch()
  const audioRef = useRef()

  // console.log('[Player Component]: Re-render')
  // console.log('[Player Component] repeatValue: ', repeatValue)
  // console.log('[Player Component] - isPlaying:', isPlaying)

  // SideEffects
  // 1. Call 2 API lấy Song Info và Song Source
  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetInfoSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      // Nếu không API nào bị lỗi
      if (res2.data.err === 0 && res1.data.err === 0) {
        setSongInfo(res1.data.data)
        audioRef.current.src = res2.data.data['128']
      } else {
        toast.warn(res2.data.msg || res1.data.msg)
      }
    }

    fetchDetailSong()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFirstTime(false)
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // 2.Xử lý khi src thay đổi
  useEffect(() => {
    if (isFirstTime) {
      dispatch(actions.togglePlayMusic(false))
      setVolume(audioRef.current.volume = 0.5)
    } else {
      dispatch(actions.setHistory(songInfo))
      dispatch(actions.togglePlayMusic(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef?.current?.src])

  // 3. Mỗi lần audio volume thay đổi thì update
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  // 4. Xử lý Bật/ tắt nhạc
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  useEffect(() => {
    if (playlistFavoriteSong) {
      const arr = playlistFavoriteSong.map(item => item.encodeId)
      setplaylistFavoriteOnlyEncodeID(arr)
    }
  }, [playlistFavoriteSong])

  // Handle events
  // 1. Xử lý Button Play
  const handleTogglePlayMusic = () => {
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }

  // 2. Xử lý sự kiện click vào progressbar
  const onChangeValueInput = (e) => {
    // Căn cho thumb vào trong khung
    const thumbWidth = 12
    const centerThumb = thumbWidth * percentage / 100
    setThumbMarginLeft(centerThumb)

    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  // 3.Hàm này sẽ chạy liên tục vì được gán với onTimeUpdate của Audio => re-render component liên tục
  const getCurrentDuration = (e) => {
    let percent
    e.currentTarget.currentTime === 0 ? percent = 0 : percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime.toFixed(2)

    setPercentage(+percent)
    setCurrentTime(time)

    // Xử lý khi hết bài hát
    if (e.currentTarget.currentTime === e.currentTarget.duration) {
      if (repeatValue === 2) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      } else {
        audioRef.current.currentTime = 0
        handleNextSong()
      }
    }
  }

  const handleNextSong = () => {
    const currentSongIndex = curPlaylist?.songs?.findIndex(song => song.encodeId === curSongId)
    if (currentSongIndex === curPlaylist?.songs?.length - 1) {
      dispatch(actions.setCurSongId(curPlaylist.songs[0].encodeId))
      dispatch(actions.togglePlayMusic(false))
    } else {
      const nextSongId = curPlaylist.songs[currentSongIndex + 1].encodeId
      dispatch(actions.setCurSongId(nextSongId))
      dispatch(actions.togglePlayMusic(false))
    }

    if (repeatValue === 2) dispatch(actions.setRepeatValue(0))

  }

  const handlePrevSong = () => {
    if (audioRef?.current?.currentTime < 5) {
      const currentSongIndex = curPlaylist?.songs?.findIndex(song => song?.encodeId === curSongId)
      const prevSongId = curPlaylist?.songs[currentSongIndex - 1]?.encodeId
      dispatch(actions.setCurSongId(prevSongId))
      dispatch(actions.togglePlayMusic(false))
    } else {
      dispatch(actions.togglePlayMusic(false))
      audioRef.current.currentTime = 0
      dispatch(actions.togglePlayMusic(true))
    }
  }

  const handleRepeatSong = () => {
    repeatValue < 2 ? dispatch(actions.setRepeatValue(repeatValue + 1)) : dispatch(actions.setRepeatValue(0))
  }

  const handleToggleShuffle = () => {
    if (isShuffle === false) {
      dispatch(actions.toggleShuffle(true))

      const currentSongIndex = curPlaylist?.songs?.findIndex(song => song.encodeId === curSongId)
      const newPlaylist = [
        curPlaylist?.songs?.[currentSongIndex],
        ...curPlaylist?.songs?.slice().filter(item => item.encodeId !== curSongId).sort(() => Math.random() - 0.5)
      ]
      // console.log(curPlaylist)
      // console.log(newPlaylist)
      dispatch(actions.setPlaylistBeforeShuffle({ ...curPlaylist }))
      dispatch(actions.setCurPlaylist({
        ...curPlaylist,
        songs: newPlaylist
      }))
    }
    else {
      dispatch(actions.toggleShuffle(false))
      dispatch(actions.setCurPlaylist({
        ...playlistBeforeShuffle,
      }))

    }
  }

  const handleToggleShowPlaylist = () => {
    dispatch(actions.toggleShowPlaylist(!isShowPlaylist))
  }
  const handleAddFavoriteSong = () => {
    dispatch(actions.addFavoriteSong(songInfo))
    toast('Thêm bài hát vào thư viên thành công')
  }

  const handleDelFavoriteSong = () => {
    dispatch(actions.delFavoriteSong(curSongId))
    toast('Xóa bài hát khỏi thư viên thành công')
  }

  return (
    <div className='h-full flex z-50'>
      {/* Song Info */}
      <div className='w-[30%] flex-auto flex items-center'>
        {songInfo && <div className='flex flex-auto items-center'>
          <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-[5px] mr-3' />
          <div className='flex flex-col mr-5'>
            <span className='text-primary-text-color font-medium text-[14px]'>{songInfo?.title}</span>
            <h3 className='text-player-text-color font-normal text-[12px]'>{songInfo?.artistsNames}</h3>
          </div>
          <div className='flex items-center justify-center gap-1'>
            <Tippy placement='top' delay={[0, 50]}
              render={attrs => (
                <WrapperButton>
                  {playlistFavoriteOnlyEncodeID.includes(curSongId) ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'}
                </WrapperButton>
              )}>
              <div
                onClick={playlistFavoriteOnlyEncodeID.includes(curSongId) ? handleDelFavoriteSong : handleAddFavoriteSong}
                className=' flex items-center justify-center text-primary-text-color hover:bg-[#2d2d2d] rounded-full'>
                <div className='px-[8px] py-[8px]'>
                  {playlistFavoriteOnlyEncodeID.includes(curSongId)
                    ? <AiFillHeart className='text-pink-#9b4de0' size={16} />
                    : <SlHeart className='text-white' size={16} />}
                </div>
              </div>
            </Tippy>
            <div className='flex items-center justify-center text-primary-text-color hover:bg-[#2d2d2d] rounded-full'>
              <div className='px-[8px] py-[8px]'>
                <BsThreeDots size={16} />
              </div>
            </div>
          </div>
        </div>}
      </div>
      {/* Music Player */}
      <div className='w-[30%] flex-auto flex flex-col items-center justify-center text-primary-text-color'>
        {/* Control music player */}
        <div className='flex justify-center items-center h-[50px] gap-[14px]'>
          {/* Shuffle */}
          <span
            title='Bật phát ngẫu nhiên'
            onClick={handleToggleShuffle}
            className={`flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full ${isShuffle && 'text-pink-#9b4de0'}`}
          >
            <div className='px-2 py-2'>
              <RxShuffle size={16} />
            </div>
          </span>
          {/* Previous */}
          <span
            className={`flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full
            ${((audioRef?.current?.currentTime < 5 && +curPlaylist?.songs?.findIndex(song => song?.encodeId === curSongId) === 0)) && 'pointer-events-none opacity-50'}
            `}
          >
            <div
              className='px-[3px] py-[3px]'
              onClick={handlePrevSong}
            >
              <MdSkipPrevious size={26} />
            </div>
          </span>
          {/* Play/Pause */}
          <span
            onClick={handleTogglePlayMusic}
            className='flex items-center justify-center w-[50px] h-[50px] hover:text-button-header-color'
          >
            <div className='px-[6px] py-[6px]'>
              {isPlaying ? <FiPauseCircle size={40} /> : <BsPlayCircle size={38} />}
            </div>
          </span>
          {/* Next */}
          <span className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'>
            <div
              className='px-[3px] py-[3px]'
              onClick={handleNextSong}
            >
              <MdSkipNext size={26} />
            </div>
          </span>
          {/* Repeat */}
          <span
            title='Bật phát lại tất cả'
            onClick={handleRepeatSong}
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            {repeatValue === 0 && <div className='px-[7px] py-[7px]'>
              <TbRepeat size={18} />
            </div>}
            {repeatValue === 1 && <div className='px-[7px] py-[7px] text-pink-#9b4de0'>
              <TbRepeat size={18} />
            </div>}
            {repeatValue === 2 && <div className='px-[7px] py-[7px] text-pink-#9b4de0'>
              <TbRepeatOnce size={18} />
            </div>}
          </span>
        </div>
        {/* Progressbar */}
        <div className='flex w-full justify-center items-center mb-[5px] gap-[10px] text-xs'>
          <div className='text-black-#FFFFFF80 flex-none font-medium'>
            {moment.utc(currentTime * 1000).format("mm:ss")}
          </div>

          <div className='flex-1 flex items-center relative w-full group'>
            {/* Slider container::before */}
            <div className='absolute bg-black-#FFFFFF80 w-[99%] group-hover:h-[6px] h-[3px] block rounded-[4px] top-1/2 left-0 transform translate-y-[-50%] pointer-events-none opacity-100 '></div>
            {/* progress bar cover */}
            <div
              style={{
                width: `${percentage}%`
              }}
              className='absolute bg-white w-[20%] group-hover:h-[6px] h-[3px] block rounded-[4px] top-1/2 transform translate-y-[-50%] pointer-events-none opacity-100 z-[1] select-none '></div>
            {/* Thumb*/}
            <div
              style={{
                left: `${percentage}%`,
                marginLeft: `-${thumbMarginLeft}px`
              }}
              className='w-3 h-3 z-[3] group-hover:block hidden bg-white absolute rounded-full top-1/2 transform translate-x-[0px] translate-y-[-50%] pointer-events-none select-none'></div>
            {/* Range */}
            <input
              type='range'
              step='0.01'
              ref={rangeRef}
              value={percentage}
              onChange={onChangeValueInput}
              className='appearance-none h-[3px] w-full cursor-pointer opacity-0 my-0 mx-auto'
            />
            <audio
              ref={audioRef}
              onTimeUpdate={getCurrentDuration}
            >
            </audio>
          </div>
          <div className='flex-none font-medium'>
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </div>
        </div>
      </div>
      {/* Control */}
      <div className='w-[30%] flex-auto flex items-center justify-end'>
        <PlayerVolume volume={volume} setVolume={setVolume} />
        <div className='h-[33px] w-[1px] mx-5 bg-black-#ffffff1a'></div>
        {/* On/Off playlist music player */}
        <div>
          <button
            onClick={handleToggleShowPlaylist}
            className={`flex items-center justify-center w-8 h-8 text-white rounded-md
            ${isShowPlaylist ? 'bg-pink-#9b4de0 hover:brightness-90' : 'bg-[#2d2d2d] hover:bg-[#ffffff33]'}
            `}
          >
            <MdOutlineQueueMusic size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player