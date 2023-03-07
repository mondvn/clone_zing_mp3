import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AlbumItem from '../common/AlbumItem'

const MyMusicAlbum = () => {
  const [listAlbum, setListAlbum] = useState([])
  const { listFavoriteAlbum } = useSelector(state => state.music)

  useEffect(() => {
    setListAlbum(listFavoriteAlbum)
  }, [listFavoriteAlbum])

  return (
    <div className='grid grid-cols-5 gap-7'>
      {listAlbum?.map(item => (
        <AlbumItem albumData={item} />
      ))}
    </div>
  )
}

export default MyMusicAlbum