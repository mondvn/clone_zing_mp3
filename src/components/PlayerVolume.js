import { useState, useRef, useEffect } from 'react'

const PlayerVolume = ({ audioRef }) => {
  const [percentageVolume, setPercentageVolume] = useState(0)
  const [thumbVolumeMarginLeft, setThumbVolumeMarginLeft] = useState(0)

  const rangeVolumeRef = useRef()

  useEffect(() => {
    setPercentageVolume(audioRef.current.volume * 100)
  }, [audioRef])


  const onChangeValueInputVolume = (e) => {
    // Căn cho thumb vào trong khung
    const thumbWidth = 12
    const centerThumb = thumbWidth * percentageVolume / 100
    setThumbVolumeMarginLeft(centerThumb)

    audioRef.current.volume = e.target.value / 100
    // console.log(e.target.value)
    setPercentageVolume(e.target.value)
  }

  return (
    <div className='flex-1 flex items-center relative w-[70px] group'>
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
  )
}

export default PlayerVolume