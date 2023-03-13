import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify'
import moment from 'moment'

import * as apis from '../../apis'
import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import { AlbumPlayList } from '../../components/album'
import { WrapperButton } from '../../components/Popper';


const { BsFillPlayFill, BsPlayCircle, SlHeart, BsThreeDots, BsDot, AiFillHeart } = icons

const Album = () => {
  const { pid } = useParams()
  const dispatch = useDispatch()
  const { isPlaying, curPlaylistId, listFavoriteAlbum } = useSelector(state => state.music)
  const [playListData, setPlayListData] = useState(null)
  const [listFavoriteAlbumOnlyEncodeID, setListFavoriteAlbumOnlyEncodeID] = useState([])

  useEffect(() => {
    if (listFavoriteAlbum) {
      const arr = listFavoriteAlbum.map(item => item.encodeId)
      setListFavoriteAlbumOnlyEncodeID(arr)
    }
  }, [listFavoriteAlbum])

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid)
      if (response?.data?.err === 0) {
        setPlayListData(response?.data?.data)
      }
    }

    fetchDetailPlaylist()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid])

  const handleTogglePlayMusic = () => {
    dispatch(actions.togglePlayMusic(!isPlaying))
  }

  const handlePlayRandomMusic = () => {
    const arr = playListData?.song?.items?.filter(item => item.isWorldWide)
    const randomNumber = Math.round(Math.random() * arr.length)
    console.log('randomNumber', randomNumber)
    console.log(playListData?.song?.items[randomNumber])
    // Buoc 1: Xet shuffle = true
    dispatch(actions.toggleShuffle(true))
    // Buoc 2: Xet curSongId
    dispatch(actions.setCurSongId(arr[randomNumber].encodeId))
    // Buoc 3 xet curPlaylistId
    dispatch(actions.setCurPlaylistId(pid))
    // Buoc 4 xet CurPlaylist va playlistBeforeShuffe
    const data = {
      title: playListData?.title,
      link: playListData?.link,
      songs: arr
    }
    const dataShuffle = {
      ...data,
      songs: [
        arr[randomNumber],
        ...arr.slice().filter((_, index) => index !== randomNumber).sort(() => Math.random() - 0.5)
      ]
    }
    console.log(data)
    console.log(dataShuffle)
    dispatch(actions.setCurPlaylist(dataShuffle))
    dispatch(actions.setPlaylistBeforeShuffle(data))
    // Buoc 5 xet isPlay = false
    dispatch(actions.togglePlayMusic(false))
  }

  const handleAddFavoriteAlbum = (event) => {
    event.stopPropagation()
    // console.log(playListData)
    dispatch(actions.addFavoriteAlbum(playListData))
    toast('Thêm Album/Playlist vào thư viên thành công')

  }

  const handleDelFavoriteAlbum = (event) => {
    event.stopPropagation()
    dispatch(actions.delFavoriteAlbum(pid))
    toast('Xóa Album/Playlist khỏi thư viên thành công')

  }

  console.log('Album Component re-render')
  return (
    <div className='relative pt-[40px] flex flex-1 mx-[29px] lg:mx-[59px] h-full'>
      <div className='fixed flex flex-col w-[300px]'>
        <div
          className='overflow-hidden rounded-lg cursor-pointer relative group'
          onClick={pid === curPlaylistId ? handleTogglePlayMusic : handlePlayRandomMusic}
        >
          <div className='absolute z-10 w-1/4 top-0 bottom-0 right-0 items-center justify-end hidden group-hover:flex '>
            <Tippy placement='top' delay={[0, 50]}
              render={attrs => (
                <WrapperButton>
                  {listFavoriteAlbumOnlyEncodeID.includes(pid) ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'}
                </WrapperButton>
              )}>
              <div
                onClick={!listFavoriteAlbumOnlyEncodeID.includes(pid) ? (event) => handleAddFavoriteAlbum(event) : (event) => handleDelFavoriteAlbum(event)}
                // onClick={event => event.stopPropagation()}
                className=' flex items-center justify-center hover:bg-[#2d2d2d] rounded-full mr-10'>
                <div className='px-[12px] py-[12px]'>
                  {listFavoriteAlbumOnlyEncodeID.includes(pid)
                    ? <AiFillHeart className='text-pink-#9b4de0' size={30} />
                    : <SlHeart className='text-white' size={30} />}
                </div>
              </div>
            </Tippy>
          </div>
          <img
            src={playListData?.thumbnailM}
            alt='thumbnail'
            className='w-full object-contain rounded-lg shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
          />
          {(!isPlaying || (isPlaying && pid !== curPlaylistId)) && <div className='absolute w-full h-full top-0 left-0 bg-[#00000080] hidden group-hover:block'></div>}
          <div className={`absolute w-full h-full top-0 left-0 items-center justify-center hidden ${(!isPlaying || (isPlaying && pid !== curPlaylistId)) && 'group-hover:flex'}`}>
            <button className='text-white flex items-center justify-center'>
              <BsPlayCircle size={45} className='hover:brightness-[0.8]' />
            </button>
          </div>
          <div className={`absolute w-full h-full top-0 left-0 items-center justify-center ${(isPlaying && pid === curPlaylistId) ? 'flex' : 'hidden'}`}>
            <button className='text-white flex items-center justify-center'>
              <div className='border border-white rounded-full w-11 h-11 flex items-center justify-center'>
                <img
                  src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                  alt='gif playing'
                  className='w-5 h-5'
                />
              </div>
            </button>
          </div>
        </div>
        <div className='mt-3 flex flex-col items-center justify-center'>
          <h3 className='font-bold text-[20px] text-primary-text-color text-center'>{playListData?.title}</h3>
          {playListData?.isAlbum && <span className='flex items-center text-xs text-player-text-color leading-[21px]'>
            {playListData?.artistsNames}
            <BsDot size={24} />
            {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}
          </span>}
          {!playListData?.isAlbum && <span className='flex items-center text-xs text-player-text-color leading-[21px]'>
            Cập nhật: {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}
          </span>}
          {!playListData?.isAlbum && <span className='text-xs text-player-text-color leading-[21px]'>{playListData?.artistsNames}</span>}
          <span className='text-xs text-player-text-color leading-[21px]'>{`${Math.floor(playListData?.like / 1000)}k người yêu thích`}</span>
        </div>
        <div className='mt-4 flex flex-col items-center justify-center'>
          {pid !== curPlaylistId &&
            <button
              onClick={handlePlayRandomMusic}
              className='flex items-center justify-center gap-[5px] text-primary-text-color bg-button-primary-bg 
            rounded-full text-sm py-[9px] px-[20px] hover:brightness-90 uppercase'>
              <BsFillPlayFill size={20} />
              Phát Ngẫu Nhiên
            </button>}
          {(pid === curPlaylistId && isPlaying) &&
            <button
              onClick={handleTogglePlayMusic}
              className='flex items-center justify-center gap-[5px] text-primary-text-color bg-button-primary-bg 
              rounded-full text-sm py-[9px] px-[20px] hover:brightness-90'>
              <BsFillPlayFill size={20} />
              TẠM DỪNG
            </button>}
          {(pid === curPlaylistId && !isPlaying) &&
            <button
              onClick={handleTogglePlayMusic}
              className='flex items-center justify-center gap-[5px] text-primary-text-color bg-button-primary-bg 
              rounded-full text-sm py-[9px] px-[20px] hover:brightness-90'>
              <BsFillPlayFill size={20} />
              TIẾP TỤC PHÁT
            </button>}
          <div className='flex items-center justify-center mt-4 gap-[10px]'>
            <div className=' flex items-center justify-center text-primary-text-color bg-[#2d2d2d] rounded-full hover:brightness-90 cursor-pointer'>
              <div className='px-[11px] py-[11px]'>
                <SlHeart size={14} />
              </div>
            </div>
            <div className='flex items-center justify-center text-primary-text-color bg-[#2d2d2d] rounded-full hover:brightness-90 cursor-pointer'>
              <div className='px-[11px] py-[11px]'>
                <BsThreeDots size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ml-[330px] flex flex-col flex-auto'>
        <div className='flex mb-[10px] gap-1'>
          <span className='text-primary-text-color text-sm'>
            <span className='text-player-text-color text-sm mr-1'>Lời tựa</span>
            {playListData?.description}
          </span>
        </div>
        <AlbumPlayList songs={playListData?.song} isAlbum={playListData?.isAlbum} pid={pid} />
      </div>
    </div>
  )
}

export default Album