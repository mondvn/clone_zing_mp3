import { memo } from 'react'
import { Link } from 'react-router-dom'
import icons from '../../ultis/icons'
import AlbumItem from '../common/AlbumItem'

const { AiOutlineRight } = icons

const ArtistPlaylist = ({ playlists }) => {


  return (
    <div className='mt-12 flex flex-col'>
      <div className='mb-6 flex justify-between items-center'>
        <span className='text-xl text-white font-bold'>{playlists?.title}</span>
        {playlists?.items?.length > 5 &&
          <Link
            to={playlists?.link}
            className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={17} />
          </Link>}
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 min-[1350px]:grid-cols-5 gap-7'>
        {playlists?.items?.slice(0, 5).map(item => (
          <AlbumItem
            key={item?.encodeId}
            albumData={item}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(ArtistPlaylist)