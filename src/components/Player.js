import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import icons from '../ultis/icons'

import * as apis from '../apis'

const { SlHeart, BsThreeDots, BsPlayCircle, MdSkipPrevious, MdSkipNext, TbRepeat, FiPauseCircle, RxShuffle } = icons

const Player = () => {
  const audioElement = new Audio('https://mp3-s1-zmp3.zmdcdn.me/46565f45e2050b5b5214/2680165431153675061?authen=exp=1676733044~acl=/46565f45e2050b5b5214/*~hmac=8a878b7a9bffce74b70b4b1fb6138d3d&fs=MTY3NjU2MDI0NDmUsICyNnx3ZWJWNnwwfDM0LjIwMS4xMDQdUngMTk3')
  const { curSongId, isPlaying } = useSelector(state => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [songSource, setSongSource] = useState(null)

  console.log(audioElement)
  console.log({ isPlaying })
  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getInfoSong(curSongId),
        apis.getSong(curSongId)
      ])
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
      }
      if (res2.data.err === 0) {
        setSongSource(res2.data.data['128'])
      }
    }

    fetchDetailSong()
  }, [curSongId])

  useEffect(() => {
    var promise = audioElement.play();

    if (promise !== undefined) {
      promise.then(_ => {
        audioElement.play()
        audioElement.volume('10')
      }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
    }
  }, [curSongId])

  const handleTogglePlayMusic = () => {
    // setIsPlaying(prev => !prev)
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
        <div className='flex justify-center items-center mb-[5px]'>
          progress bar
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center'>
        volume control
      </div>
    </div>
  )
}

export default Player