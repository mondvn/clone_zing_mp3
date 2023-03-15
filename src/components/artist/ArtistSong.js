import { memo } from 'react'
import { Link } from 'react-router-dom'

import icons from '../../ultis/icons'
import ArtistSongitem from './ArtistSongitem'

const { AiOutlineRight } = icons

const ArtistSong = ({ songs }) => {
  console.log(songs)

  return (
    <div className='mt-[30px] flex flex-col'>
      <div className='mb-6 flex justify-between items-center'>
        <span className='text-xl text-white font-bold'>{songs?.title}</span>
        {songs.items.length > 6 && <Link
          to={songs?.link}
          className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
          Tất Cả
          <AiOutlineRight size={17} />
        </Link>}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-7'>
        {songs?.items?.slice(0, 6).map(item => (
          <ArtistSongitem
            key={item.encodeId}
            song={item}
            playlistSong={songs?.items}
            isAlbum={false}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(ArtistSong)