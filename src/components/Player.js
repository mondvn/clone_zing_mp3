import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'

import icons from '../ultis/icons'
import * as apis from '../apis'
import * as actions from '../store/actions'

const { SlHeart, BsThreeDots, BsPlayCircle, MdSkipPrevious, MdSkipNext, TbRepeat, FiPauseCircle, RxShuffle } = icons

var intervalId

const Player = () => {


  const { curSongId, isPlaying } = useSelector(state => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [audio, setAudio] = useState(new Audio())
  const [curTime, setCurTime] = useState(0)
  const [firstTimeRender, setFirstTimeRender] = useState(true)


  const dispatch = useDispatch()
  const thumbRef = useRef()

  console.log('[Player Component]: Re-render')
  console.log('[Player Component] - isPlaying:', isPlaying)


  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetInfoSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      if (res2.data.err === 0 && res1.data.err === 0) {
        // audio.pause()
        setSongInfo(res1.data.data)
        setAudio(new Audio(res2.data.data['128']))
      } else {
        toast.warn(res2.data.msg)
      }
    }

    fetchDetailSong()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId])

  useEffect(() => {
    audio.load()

    // Xử lý khi reload lại trang, isPlaying không bị mặc định thành true
    if (!firstTimeRender) dispatch(actions.togglePlayMusic(true))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio])


  // Xử lý thành progress bar
  useEffect(() => {
    if (isPlaying) {
      // Xử lý thanh process và hiển thị current time
      // intervalId = setInterval(() => {
      //   let percent = Math.round(audio.currentTime * 100 / songInfo?.duration)
      //   thumbRef.current.style.cssText = `right: ${100 - percent}%`
      //   setCurTime(audio.currentTime)
      // }, 200)
    }
    return () => {
      // intervalId && clearInterval(intervalId)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // Xử lý Bật/ tắt nhạc
  useEffect(() => {
    isPlaying ? audio.play() : audio.pause()

    // Xử lý khi reload lại trang, isPlaying không bị mặc định thành true
    if (isPlaying) setFirstTimeRender(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  const handleTogglePlayMusic = () => {
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }

  const handleClickProgressbar = (e) => {
    console.log(e)
  }

  return (
    <div className='h-full flex'>
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
      <div className='w-[30%] flex-auto flex flex-col items-center justify-center text-primary-text-color'>
        <div className='flex justify-center items-center h-[50px] gap-[14px]'>
          <span
            title='Bật phát ngẫu nhiên'
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-2 py-2'>
              <RxShuffle size={16} />
            </div>
          </span>
          <span
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[3px] py-[3px]'>
              <MdSkipPrevious size={26} />
            </div>
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className='flex items-center justify-center w-[50px] h-[50px] hover:text-button-header-color'
          >
            <div className='px-[6px] py-[6px]'>
              {isPlaying ? <FiPauseCircle size={40} /> : <BsPlayCircle size={38} />}
            </div>
          </span>
          <span className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'>
            <div className='px-[3px] py-[3px]'>
              <MdSkipNext size={26} />
            </div>
          </span>
          <span
            title='Bật phát lại tất cả'
            className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
          >
            <div className='px-[7px] py-[7px]'>
              <TbRepeat size={18} />
            </div>
          </span>
        </div>
        <div className='flex w-full justify-center items-center mb-[5px] gap-[10px] text-xs'>
          <div className='text-black-#FFFFFF80 flex-none font-medium'>
            {moment.utc(curTime * 1000).format("mm:ss")}
          </div>
          <div
            onClick={handleClickProgressbar}
            className='relative flex-1 w-full h-[3px] hover:h-[6px] bg-black-#FFFFFF80 rounded-l-full rounded-r-full'>
            <div ref={thumbRef} className='absolute top-0 left-0 h-full bg-white rounded-l-full rounded-r-full'></div>
          </div>
          <div className='flex-none font-medium'>
            {/* 03:33 */}
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </div>
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center'>
        volume control
      </div>
    </div>
  )
}

export default Player