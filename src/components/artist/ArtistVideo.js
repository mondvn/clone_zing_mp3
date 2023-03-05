import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import icons from '../../ultis/icons'

const { AiOutlineRight, BsPlayCircle } = icons

const ArtistVideo = ({ videos, thumbnail }) => {
  const { isPlaying, curPlaylistId } = useSelector(state => state.music)

  return (
    <div className='mt-12 flex flex-col'>
      <div className='mb-6 flex justify-between items-center'>
        <span className='text-xl text-white font-bold'>{videos?.title}</span>
        {videos.items?.length > 5 &&
          <Link
            to={videos?.link}
            className='text-black-#FFFFFF80 text-xs font-medium flex items-center uppercase justify-center gap-1 hover:text-pink-#c273ed'>
            Tất Cả
            <AiOutlineRight size={17} />
          </Link>}
      </div>
      <div className='grid grid-cols-3 gap-x-7'>
        {videos.items.slice(0, 3).map(item => (
          <div key={item?.encodeId}>
            <div className='flex flex-col'>
              <Link to={item?.link.split('.')[0]} className='relative overflow-hidden rounded-lg cursor-pointer group'>
                <img
                  src={item?.thumbnailM}
                  alt='thumbnail'
                  className='w-full object-contain rounded-lg shadow-sm transform transition duration-1000 scale-100  group-hover:scale-110 ease-in-out'
                />
                {(!isPlaying || (isPlaying && item?.encodeId !== curPlaylistId)) && <div className='absolute w-full h-full top-0 left-0 bg-[#00000080] hidden group-hover:block'></div>}
                <div
                  className={`absolute w-full h-full top-0 left-0 items-center justify-center hidden 
                    ${(!isPlaying || (isPlaying && item?.encodeId !== curPlaylistId)) && 'group-hover:flex'}`}>
                  <button
                    className='text-white flex items-center justify-center'>
                    <BsPlayCircle size={45} className='hover:brightness-[0.8]' />
                  </button>
                </div>
                <div className={`absolute w-full h-full top-0 left-0 items-center justify-center ${(isPlaying && item?.encodeId === curPlaylistId) ? 'flex' : 'hidden'}`}>
                  <button className='text-white flex items-center justify-center'>
                    <div
                      // onClick={handleTogglePlay} 
                      className='border border-white rounded-full w-11 h-11 flex items-center justify-center'>
                      <img
                        src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                        alt='gif playing'
                        className='w-5 h-5'
                      />
                    </div>
                  </button>
                </div>
                <span className='absolute right-[5px] bottom-[5px] py-[3px] px-[5px] rounded-[4px] bg-[#000000b3] text-white text-xs font-normal '>
                  {moment.unix(item?.duration).format("mm:ss")}
                </span>
              </Link>
              <div className='flex items-center py-[10px] justify-start gap-[10px]'>
                <img
                  src={thumbnail}
                  alt='avatar artist'
                  className='w-10 h-10 object-cover rounded-full'
                />
                <div className='flex flex-col'>
                  <Link
                    to={item?.link.split('.')[0]}
                    className=''
                  >
                    <h4 className='text-white text-sm font-bold line-clamp-1 hover:text-pink-#9b4de0'>{item?.title}</h4>
                  </Link>
                  <h3 className='text-black-#FFFFFF80 text-sm font-normal line-clamp-2'>
                    {item?.artists?.map((artist, index) => (
                      <Link key={artist?.id} className='hover:text-pink-#9b4de0 mr-1'>{artist?.name}</Link>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(ArtistVideo)