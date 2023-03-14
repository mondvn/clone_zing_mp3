import { useState, useRef, useEffect, memo } from 'react'

import icons from '../ultis/icons'

const { MdMusicVideo, GiMicrophone, VscChromeRestore, SlVolume2, SlVolumeOff } = icons

const PlayerVolume = ({ volume, setVolume }) => {
  console.log('Player volume: re-render')
  const [percentageVolume, setPercentageVolume] = useState(0)
  const [thumbVolumeMarginLeft, setThumbVolumeMarginLeft] = useState(0)
  const [lastVolumeValue, setLastVolumeValue] = useState(0)

  const rangeVolumeRef = useRef()

  useEffect(() => {
    setPercentageVolume(volume * 100)
  }, [volume])


  const onChangeValueInputVolume = (e) => {
    // Căn cho thumb vào trong khung
    const thumbWidth = 12
    const centerThumb = thumbWidth * percentageVolume / 100
    setThumbVolumeMarginLeft(centerThumb)

    setVolume(e.target.value / 100)
    // console.log(e.target.value)
    setPercentageVolume(e.target.value)
  }

  const handleToggleVolume = () => {
    if (volume === 0) {
      setVolume(lastVolumeValue)
      setPercentageVolume(lastVolumeValue * 100)
    } else {
      setLastVolumeValue(volume)
      setVolume(0)
      setPercentageVolume(0)

    }
  }

  return (
    <div className='hidden min-[500px]:flex items-center justify-between gap-[6px] text-white'>
      <div
        className='hidden md:flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
      >
        <div className='px-[7px] py-[7px]'>
          <MdMusicVideo size={18} />
        </div>
      </div>
      <div
        className='hidden md:flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
      >
        <div className='px-[7px] py-[7px]'>
          <GiMicrophone size={18} />
        </div>
      </div>
      <div
        className='hidden md:flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
      >
        <div className='px-[7px] py-[7px]'>
          <VscChromeRestore size={18} />
        </div>
      </div>
      <div
        className='flex items-center justify-center w-8 h-8 hover:bg-[#2d2d2d] rounded-full'
      >
        <div
          className='px-[7px] py-[7px]'
          onClick={handleToggleVolume}
        >
          {volume === 0 ? <SlVolumeOff size={18} /> : <SlVolume2 size={18} />}
        </div>
      </div>
      {/* volume bar */}
      <div className='flex-1 hidden min-[1170px]:flex items-center relative w-[70px] group'>
        {/* Slider container::before */}
        <div className='absolute bg-black-#FFFFFF80 w-[99%] group-hover:h-[6px] h-[3px] block rounded-[4px] top-1/2 left-0 transform translate-y-[-50%] pointer-events-none opacity-100 '></div>
        {/* progress bar cover */}
        <div
          style={{
            width: `${percentageVolume}%`
          }}
          className='absolute bg-white w-[20%] group-hover:h-[6px] h-[3px] block rounded-[4px] top-1/2 transform translate-y-[-50%] pointer-events-none opacity-100 z-[1] select-none '></div>
        {/* Thumb*/}
        <div
          style={{
            left: `${percentageVolume}%`,
            marginLeft: `-${thumbVolumeMarginLeft}px`
          }}
          className='w-3 h-3 z-[3] group-hover:block hidden bg-white absolute rounded-full top-1/2 transform translate-x-[0px] translate-y-[-50%] pointer-events-none select-none'></div>
        {/* Range */}
        <input
          type='range'
          step='0.01'
          ref={rangeVolumeRef}
          value={percentageVolume}
          onChange={onChangeValueInputVolume}
          className='appearance-none h-[3px] w-full cursor-pointer opacity-0 my-0 mx-auto'
        />
      </div>
    </div>
  )
}

export default memo(PlayerVolume)