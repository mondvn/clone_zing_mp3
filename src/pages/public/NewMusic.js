import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as apis from '../../apis'
import ZingChartSong from '../../components/zingChart/ZingChartSong'
import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import bgNewRelease from '../../assets/images/new-release-bg.jpg'


const { BsFillPlayFill } = icons
const NewMusic = () => {
  const dispatch = useDispatch()
  const { curSongId, isPlaying, isShuffle, curPlaylist } = useSelector(state => state.music)
  const [listSong, setListSong] = useState([])

  useEffect(() => {
    const fetchNewRelease = async () => {
      const response = await apis.apiGetNewReleaseChart()
      if (response?.data?.err === 0) setListSong(response?.data?.data)
    }
    fetchNewRelease()
  }, [])
  const handlePlaySong = (encodeId) => {
    dispatch(actions.setCurPlaylistId(''))
    if (curSongId === encodeId) {
      dispatch(actions.togglePlayMusic(!isPlaying))
    } else {
      dispatch(actions.setCurSongId(encodeId))
      if (isShuffle) {
        const arr = listSong?.items?.filter(item => item.isWorldWide)
        const currentSongIndex = listSong?.items?.findIndex(item => item.encodeId === encodeId)
        const data = {
          title: '',
          link: '',
          songs: arr
        }
        const dataShuffle = {
          ...data,
          songs: [
            listSong?.items[currentSongIndex],
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
          songs: [...listSong?.items.filter(item => item.isWorldWide)]
        }))
      }
      dispatch(actions.togglePlayMusic(false))
    }
  }
  return (
    <div>
      <div className='mt-[-70px] text-white relative'>
        <img src={bgNewRelease} alt='bg-chart' className='object-cover w-full h-[260px] grayscale' />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff00] to-[#1e1e1e] opacity-80'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#1e1e1e] opacity-80'></div>
      </div>
      <div className='relative mt-[-140px] mx-[59px]'>
        <div className='flex items-center gap-2 mb-[25px]'>
          <span className='text-[40px] text-white font-extrabold'>Nhạc Mới</span>
          <div>
            <button
              onClick={() => handlePlaySong(listSong?.items[0]?.encodeId)}
              className='relative h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
              <BsFillPlayFill size={26} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
              <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
            </button>
          </div>
        </div>
        <ZingChartSong
          isShowButton={false}
          songs={listSong}
          lengthChart={listSong?.items?.lenght}
          textColor={true}
          isShowAlbum={true}
          numberWidth={60}
          borderBottom={true}
        />
      </div>
    </div>
  )
}

export default NewMusic