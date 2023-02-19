import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'

import icons from '../ultis/icons'
import * as apis from '../apis'
import * as actions from '../store/actions'

const { SlHeart, BsThreeDots, BsPlayCircle, MdSkipPrevious, MdSkipNext, TbRepeat, FiPauseCircle,
  RxShuffle, MdMusicVideo, GiMicrophone, VscChromeRestore, SlVolumeOff, SlVolume2, MdOutlineQueueMusic } = icons

var intervalId

const Player = () => {
  const { curSongId, isPlaying, isPlayingOnAlbum } = useSelector(state => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [audio, setAudio] = useState(new Audio())
  const [curTime, setCurTime] = useState(0)
  const [firstTimeRender, setFirstTimeRender] = useState(true)

  const dispatch = useDispatch()
  const thumbRef = useRef()
  const trackRef = useRef()

  // console.log('[Player Component]: Re-render')
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
        setAudio(new Audio(res2.data.data['128']))
        console.log(songInfo)
      } else {
        toast.warn(res2.data.msg || res1.data.msg)
      }
    }

    fetchDetailSong()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId])

  // 2. Xử lý khi audio source thay đổi
  useEffect(() => {
    audio.load()

    // Xử lý khi reload lại trang, isPlaying không bị mặc định thành true
    if (!firstTimeRender) dispatch(actions.togglePlayMusic(true))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio])

  // 3. Xử lý Bật/ tắt nhạc
  useEffect(() => {
    isPlaying ? audio.play() : audio.pause()

    // Xử lý khi reload lại trang, isPlaying không bị mặc định thành true
    if (isPlaying) setFirstTimeRender(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // 4. Xử lý thanh process và hiển thị current time
  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        let percent = Math.round(audio.currentTime * 100 / songInfo?.duration)
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurTime(audio.currentTime)
      }, 200)
    }
    return () => {
      intervalId && clearInterval(intervalId)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // Handle events
  // 1. Xử lý Button Play
  const handleTogglePlayMusic = () => {
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }

  // 2. Xử lý click vào Progressbar
  const handleClickProgressbar = (e) => {
    // Lấy tọa độ trackRef
    const trackRect = trackRef.current.getBoundingClientRect()
    const percent = (e.clientX - trackRect.left) / trackRect.width

    // Xét lại progress bar
    thumbRef.current.style.cssText = `right: ${(1 - percent) * 100}%`
    // Xét lại thời gian bài hát
    audio.currentTime = songInfo?.duration * percent
    // Xét lại thời gian bài hát progress bar
    setCurTime(audio.currentTime)
  }
  // 3. Xử lý Next Song
  const handleNextSong = () => { }

  return (
    <div className='h-full flex'>
      {/* Song Info */}
      <div className='w-[30%] flex-auto flex items-center'>
        <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-[5px] mr-3' />
        <div className='flex flex-col mr-5'>
          <span className='text-primary-text-color font-medium text-[14px]'>{songInfo?.title}</span>
          <h3 className='text-player-text-color font-normal text-[12px]'>{songInfo?.artistsNames}</h3>
        </div>
        <div className='flex items-center justify-center gap-1'>
          <div className=' flex items-center justify-center text-primary-text-color hover:bg-[#2d2d2d] rounded-full'>
            <div className='px-[8px] py-[8px]'>
              <SlHeart size={16} />
            </div>
          </div>
          <div className='flex items-center justify-center text-primary-text-color hover:bg-[#2d2d2d] rounded-full'>
            <div className='px-[8px] py-[8px]'>
              <BsThreeDots size={16} />
            </div>
          </div>
        </div>
      </div>
      {/* Music Player */}
      <div className='w-[30%] flex-auto flex flex-col items-center justify-center text-primary-text-color'>
        {/* Control music player */}
        <div className='flex justify-center items-center h-[50px] gap-[14px]'>
          {/* Random */}
          <span
            title='Bật phát ngẫu nhiên'
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-2 py-2'>
              <RxShuffle size={16} />
            </div>
          </span>
          {/* Previous */}
          <span
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[3px] py-[3px]'>
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
              onClick={handleNextSong}
              className='px-[3px] py-[3px]'
            >
              <MdSkipNext size={26} />
            </div>
          </span>
          {/* Repeat */}
          <span
            title='Bật phát lại tất cả'
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[7px] py-[7px]'>
              <TbRepeat size={18} />
            </div>
          </span>
        </div>
        {/* Progressbar */}
        <div className='flex w-full justify-center items-center mb-[5px] gap-[10px] text-xs'>
          <div className='text-black-#FFFFFF80 flex-none font-medium'>
            {moment.utc(curTime * 1000).format("mm:ss")}
          </div>
          <div
            onClick={handleClickProgressbar}
            ref={trackRef}
            className='relative flex-1 w-full h-[3px] hover:h-[6px] bg-black-#FFFFFF80 rounded-l-full rounded-r-full'>
            <div ref={thumbRef} className='absolute top-0 left-0 h-full bg-white rounded-l-full rounded-r-full'></div>
          </div>
          <div className='flex-none font-medium'>
            {/* 03:33 */}
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </div>
        </div>
      </div>
      {/* Control */}
      <div className='w-[30%] flex-auto flex items-center justify-end'>
        {/* control buttons */}
        <div className='flex items-center justify-between gap-[6px] text-white'>
          <div
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[7px] py-[7px]'>
              <MdMusicVideo size={18} />
            </div>
          </div>
          <div
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[7px] py-[7px]'>
              <GiMicrophone size={18} />
            </div>
          </div>
          <div
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[7px] py-[7px]'>
              <VscChromeRestore size={18} />
            </div>
          </div>
          <div
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[7px] py-[7px]'>
              <SlVolume2 size={18} />
            </div>
          </div>
          {/* volume bar */}
          <div className='relative w-[70px] h-[3px] hover:h-[6px] bg-black-#FFFFFF80 rounded-l-full rounded-r-full'>
            <div className='absolute top-0 left-0 h-full bg-white rounded-l-full rounded-r-full'></div>
          </div>
        </div>
        <div className='h-[33px] w-[1px] mx-5 bg-black-#ffffff1a'></div>
        {/* On/Of playlist music player */}
        <div>
          <button className='flex items-center justify-center w-8 h-8 bg-[#2d2d2d] hover:bg-black-#ffffff33 rounded-md text-white'>
            <MdOutlineQueueMusic size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player