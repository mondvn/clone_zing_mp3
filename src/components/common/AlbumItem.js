import { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { WrapperButton } from '../Popper';
import { toast } from 'react-toastify'

import icons from '../../ultis/icons'
import * as apis from '../../apis'
import * as actions from '../../store/actions'

const { BsPlayCircle, SlHeart, AiFillHeart } = icons

const AlbumItem = ({ albumData }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isPlaying, curPlaylistId, listFavoriteAlbum } = useSelector(state => state.music)
  const [listFavoriteAlbumOnlyEncodeID, setListFavoriteAlbumOnlyEncodeID] = useState([])

  useEffect(() => {
    if (listFavoriteAlbum) {
      const arr = listFavoriteAlbum.map(item => item.encodeId)
      setListFavoriteAlbumOnlyEncodeID(arr)
    }
  }, [listFavoriteAlbum])

  const handlePlayAlbum = async (pid) => {
    const response = await apis.apiGetDetailPlaylist(pid)
    if (response?.data?.err === 0) {
      const playlistData = response?.data?.data
      const arr = playlistData?.song?.items?.filter(item => item.isWorldWide)
      if (arr.length === 0) {
        toast.warn('Phải nạp VIP mới nghe được ALbum/Playlist này :(')
        return
      }
      const randomNumber = Math.round(Math.random() * arr.length)
      // console.log('randomNumber', randomNumber)
      // console.log(playlistData?.song?.items[randomNumber])

      // Buoc 1: Xet shuffle = true
      dispatch(actions.toggleShuffle(true))
      // Buoc 2: Xet curSongId
      dispatch(actions.setCurSongId(arr[randomNumber].encodeId))
      // Buoc 3 xet curPlaylistId
      dispatch(actions.setCurPlaylistId(pid))
      // Buoc 4 xet CurPlaylist va playlistBeforeShuffe
      const data = {
        title: playlistData?.title,
        link: playlistData?.link,
        songs: arr
      }
      const dataShuffle = {
        ...data,
        songs: [
          arr[randomNumber],
          ...arr.slice().filter((_, index) => index !== randomNumber).sort(() => Math.random() - 0.5)
        ]
      }
      // console.log(data)
      // console.log(dataShuffle)
      dispatch(actions.setCurPlaylist(dataShuffle))
      dispatch(actions.setPlaylistBeforeShuffle(data))
      // Buoc 5 xet isPlay = false
      dispatch(actions.togglePlayMusic(false))
    }
  }

  const handleTogglePlay = (event) => {
    event.stopPropagation()
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }

  const handleAddFavoriteAlbum = (event) => {
    event.stopPropagation()
    dispatch(actions.addFavoriteAlbum(albumData))
    toast('Thêm Album/Playlist vào thư viên thành công')

  }

  const handleDelFavoriteAlbum = (event) => {
    event.stopPropagation()
    dispatch(actions.delFavoriteAlbum(albumData?.encodeId))
    toast('Xóa Album/Playlist khỏi thư viên thành công')

  }

  const handleNavigate = () => {
    navigate(albumData?.link)
  }

  return (
    <div className='flex flex-col'>
      <div onClick={handleNavigate} className='relative overflow-hidden rounded-lg cursor-pointer group'>
        <div className='absolute z-10 w-1/4 top-0 bottom-0 right-0 items-center justify-end hidden group-hover:flex '>
          <Tippy placement='top' delay={[0, 50]}
            render={attrs => (
              <WrapperButton>
                {listFavoriteAlbumOnlyEncodeID.includes(albumData?.encodeId) ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'}
              </WrapperButton>
            )}>
            <div
              onClick={!listFavoriteAlbumOnlyEncodeID.includes(albumData?.encodeId) ? (event) => handleAddFavoriteAlbum(event) : (event) => handleDelFavoriteAlbum(event)}
              className=' flex items-center justify-center hover:bg-[#2d2d2d] rounded-full mr-3'>
              <div className='px-[12px] py-[12px]'>
                {listFavoriteAlbumOnlyEncodeID.includes(albumData?.encodeId)
                  ? <AiFillHeart className='text-pink-#9b4de0' size={20} />
                  : <SlHeart className='text-white' size={20} />}
              </div>
            </div>
          </Tippy>
        </div>
        <img
          src={albumData?.thumbnailM}
          alt='thumbnail'
          className='w-full object-contain rounded-lg shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
        />
        {(!isPlaying || (isPlaying && albumData?.encodeId !== curPlaylistId)) && <div className='absolute w-full h-full top-0 left-0 bg-[#00000080] hidden group-hover:block'></div>}
        <div
          className={`absolute w-full h-full top-0 left-0 items-center justify-center hidden 
                      ${(!isPlaying || (isPlaying && albumData?.encodeId !== curPlaylistId)) && 'group-hover:flex'}`}>
          <button
            onClick={albumData?.encodeId === curPlaylistId ? event => handleTogglePlay(event) : () => handlePlayAlbum(albumData?.encodeId)}
            className='text-white flex items-center justify-center'>
            <BsPlayCircle size={45} className='hover:brightness-[0.8]' />
          </button>
        </div>
        <div className={`absolute w-full h-full top-0 left-0 items-center justify-center ${(isPlaying && albumData?.encodeId === curPlaylistId) ? 'flex' : 'hidden'}`}>
          <button className='text-white flex items-center justify-center'>
            <div onClick={handleTogglePlay} className='border border-white rounded-full w-11 h-11 flex items-center justify-center'>
              <img
                src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                alt='gif playing'
                className='w-5 h-5'
              />
            </div>
          </button>
        </div>
      </div>
      <Link
        to={albumData?.link.split('.')[0]}
        className='mt-3 mb-1'
      >
        <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{albumData?.title}</h4>
      </Link>
      <h3 className='text-black-#FFFFFF80 text-sm font-normal line-clamp-2'>
        {albumData?.sortDescription || albumData?.artistsNames}
      </h3>
    </div>
  )
}

export default memo(AlbumItem)