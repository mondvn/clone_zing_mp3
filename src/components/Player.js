import React from 'react'
import { useSelector } from 'react-redux'

const Player = () => {

  const { curSongId } = useSelector(state => state.music)

  return (
    <div className='h-full flex'>
      <div className='w-[30%] flex'>
        detail song
      </div>
      <div className='w-[30%] flex'>
        Main player
      </div>
      <div className='w-[30%] flex'>
        volume control
      </div>
    </div>
  )
}

export default Player