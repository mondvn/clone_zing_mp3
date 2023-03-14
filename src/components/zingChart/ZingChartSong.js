import { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import Tippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify'

import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import { WrapperButton } from '../Popper';

const { BsFillPlayFill, RxBorderSolid, BsCaretDownFill, BsCaretUpFill, RiVipCrown2Line, AiFillHeart, SlHeart } = icons


const ZingChartSong = ({ songs, lengthChart, textColor, isShowAlbum, numberWidth, borderBottom, isTop100, isShowButton, link }) => {
  const { isPlaying, curSongId, isShuffle, curPlaylist, playlistFavoriteSong } = useSelector(state => state.music)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [length, setLength] = useState(lengthChart)
  const [playlistFavoriteOnlyEncodeID, setplaylistFavoriteOnlyEncodeID] = useState([])

  useEffect(() => {
    if (playlistFavoriteSong) {
      const arr = playlistFavoriteSong.map(item => item.encodeId)
      setplaylistFavoriteOnlyEncodeID(arr)
    }
  }, [playlistFavoriteSong])

  const handleToggleLength = () => {
    length === lengthChart ? setLength(songs?.items?.length) : setLength(lengthChart)
  }

  const handleNavigate = () => {
    navigate(link)
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

  const handleAddFavoriteSong = (song) => {
    dispatch(actions.addFavoriteSong(song))
    toast('Thêm bài hát vào thư viên thành công')

  }

  const handleDelFavoriteSong = (encodeId) => {
    dispatch(actions.delFavoriteSong(encodeId))
    toast('Xóa bài hát khỏi thư viên thành công')

  }

  console.log(songs)
  return (
    <div className='flex flex-col'>
      {songs?.items?.slice(0, length).map((item, index) => (
        <div
          key={item?.encodeId}
          className={`relative flex items-center justify-start text-player-text-color p-[10px] text-xs group rounded-[4px]  hover:bg-black-#ffffff1a
          ${!item?.isWorldWide && 'pointer-events-none'} 
          ${borderBottom && 'border-b border-black-#ffffff1a'}`}>
          <div className='absolute z-10 w-1/4 top-0 bottom-0 right-0 items-center justify-end hidden group-hover:flex '>
            <Tippy placement='top' delay={[0, 50]}
              render={attrs => (
                <WrapperButton>
                  {playlistFavoriteOnlyEncodeID.includes(item?.encodeId) ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'}
                </WrapperButton>
              )}>
              <div onClick={playlistFavoriteOnlyEncodeID.includes(item?.encodeId) ? () => handleDelFavoriteSong(item?.encodeId) : () => handleAddFavoriteSong(item)}
                className=' flex items-center justify-center hover:bg-[#2d2d2d] rounded-full mr-5'>
                <div className='px-[8px] py-[8px]'>
                  {playlistFavoriteOnlyEncodeID.includes(item?.encodeId)
                    ? <AiFillHeart className='text-pink-#9b4de0' size={16} />
                    : <SlHeart className='text-white' size={16} />}
                </div>
              </div>
            </Tippy>
          </div>
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
              <div className='flex text-sm text-white font-semibold gap-1'>
                <div className='line-clamp-1'>{item.title}</div>
                <div className={`${!item?.isWorldWide ? 'flex' : 'hidden'} items-center justify-center text-yellow-300`}><RiVipCrown2Line size={16} /></div>
              </div>
              <h3 className='flex line-clamp-1'>
                {item?.artists?.map((artist) => (
                  <Link to={artist?.link} key={artist?.id} className='hover:text-pink-#9b4de0 mr-1'>{artist?.name}</Link>
                ))}
              </h3>
            </div>
          </div>
          {isShowAlbum && <span className='hidden sm:flex flex-1 text-xs text-black-#FFFFFF80 font-normal'>{item?.album?.title}</span>}
          <div className='flex-none ml-[10px] group-hover:hidden'>{moment.unix(item?.duration).format("mm:ss")}</div>
        </div>
      ))}
      {isShowButton && <button
        onClick={isTop100 ? handleToggleLength : handleNavigate}
        className='flex items-center justify-center text-sm text-white font-medium rounded-full 
          border border-white py-2 px-[25px] mx-auto mt-6 hover:bg-black-#ffffff1a'>
        {isTop100 ? 'Xem Top 100' : 'Xem Tất Cả'}
      </button>}

      {/* {!isTop100 && 
      <Link
        to={link}
        className='flex items-center justify-center text-sm text-white font-medium rounded-full 
          border border-white py-2 px-[25px] mx-auto mt-6 hover:bg-black-#ffffff1a cursor-pointer'>
        Xem tất cả
      </Link>} */}

    </div>
  )
}

export default memo(ZingChartSong)