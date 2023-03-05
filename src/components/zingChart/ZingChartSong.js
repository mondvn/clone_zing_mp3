import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'

const { BsFillPlayFill, AiOutlineRight, RxBorderSolid, BsCaretDownFill, BsCaretUpFill } = icons


const ZingChartSong = ({ songs, lengthChart, textColor, isShowAlbum, numberWidth, borderBottom }) => {
  const [length, setLength] = useState(lengthChart)
  const { isPlaying, curSongId, isShuffle, curPlaylist } = useSelector(state => state.music)
  const dispatch = useDispatch()

  const handleToggleLength = () => {
    length === lengthChart ? setLength(songs?.items?.length) : setLength(lengthChart)
  }

  const handlePlaySong = (encodeId) => {
    dispatch(actions.setCurPlaylistId(''))
    if (curSongId === encodeId) {
      dispatch(actions.togglePlayMusic(!isPlaying))
    } else {
      dispatch(actions.setCurSongId(encodeId))
      if (isShuffle) {
        const arr = songs?.items?.filter(item => item.isWorldWide)
        const currentSongIndex = songs?.items?.findIndex(item => item.encodeId === encodeId)
        const data = {
          title: '',
          link: '',
          songs: arr
        }
        const dataShuffle = {
          ...data,
          songs: [
            songs?.items[currentSongIndex],
            ...arr.slice().filter(item => item.encodeId !== encodeId).sort(() => Math.random() - 0.5)
          ]
        }
        dispatch(actions.setCurPlaylist(dataShuffle))
        dispatch(actions.setPlaylistBeforeShuffle(data))
      } else {
        dispatch(actions.setCurPlaylist({
          ...curPlaylist,
          title: '',
          link: '',
          songs: [...songs?.items.filter(item => item.isWorldWide)]
        }))
      }
      dispatch(actions.togglePlayMusic(false))
    }
  }
  return (
    <div className='flex flex-col'>
      {songs?.items?.slice(0, length).map((item, index) => (
        <div
          key={item.encodeId}
          className={`flex items-center justify-start text-player-text-color p-[10px] text-xs group rounded-[4px]  hover:bg-black-#ffffff1a
          ${borderBottom && 'border-b border-black-#ffffff1a'}`}>
          <div className='flex items-center justify-center gap-[5px] mr-[15px]'>
            <span style={{ width: `${numberWidth}px` }} className={(textColor && index <= 2) ? `flex items-center justify-center font-black text-[32px] w-[${numberWidth}px] text-[#4a90e200] text-stroke-zc-${index}`
              : `flex items-center justify-center font-black text-[32px] w-[${numberWidth}px] text-[#4a90e200] text-stroke-zc`}>{index + 1}</span>
            <div>
              {item?.rakingStatus === 0 && <RxBorderSolid size={18} />}
              {item?.rakingStatus < 0 &&
                <div className='flex flex-col items-center justify-center'>
                  <BsCaretDownFill size={18} className='text-red-500' />
                  <span className='text-xs text-white font-bold'>{Math.abs(item?.rakingStatus)}</span>
                </div>}
              {item?.rakingStatus > 0 &&
                <div className='flex flex-col items-center justify-center'>
                  <BsCaretUpFill size={18} className='text-green-500' />
                  <span className='text-xs text-white font-bold'>{item?.rakingStatus}</span>
                </div>}
            </div>
          </div>
          <div className='flex flex-1 items-center'>
            <div className='flex flex-shrink-0 relative mr-[16px] cursor-pointer' onClick={() => handlePlaySong(item?.encodeId)}>
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
              <h3 className='flex gap-1 line-clamp-1'>
                {item?.artists?.map((artist, index) => (
                  <Link key={artist?.id} className='hover:text-pink-#9b4de0'>{artist?.name}</Link>
                ))}
              </h3>
            </div>
          </div>
          {isShowAlbum && <span className='flex flex-1 text-xs text-black-#FFFFFF80 font-normal'>{item?.album?.title}</span>}
          <div className='flex-none ml-[10px]'>{moment.unix(item?.duration).format("mm:ss")}</div>
        </div>
      ))}
      <button
        onClick={handleToggleLength}
        className='flex items-center justify-center text-sm text-white font-medium 
      rounded-full border border-white py-2 px-[25px] mx-auto mt-6'>Xem top 100</button>
    </div>
  )
}

export default memo(ZingChartSong)