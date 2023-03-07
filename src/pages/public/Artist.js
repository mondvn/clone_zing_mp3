import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as apis from '../../apis'
import icons from '../../ultis/icons'
import { ArtistArtist, ArtistPlaylist, ArtistSong, ArtistVideo } from '../../components/artist'

const { BsFillPlayFill, SlUserFollow } = icons

const Artist = () => {
  const { artist } = useParams()
  const [artistData, setArtistData] = useState(null)
  const ArtistRef = useRef()

  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apis.apiGetArtist(artist)
      if (res.data.err === 0) {
        setArtistData(res.data.data)
      }
    }
    artist && fetchArtistData()
  }, [artist])

  useEffect(() => {
    ArtistRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [artist])

  return (
    <div className='flex flex-col w-full mb-[30px]'>
      <div ref={ArtistRef} className='mt-[-70px] relative'>
        <img
          src={artistData?.cover}
          alt='cover artist'
          className='h-[410px] object-cover'
        />
        <div className='absolute left-[59px] bottom-6 flex text-white'>
          <div className='flex flex-col'>
            <div className='flex items-center justify-start mb-4 gap-5'>
              <h3 className='text-[60px] font-bold leading-[1.2]'>{artistData?.name}</h3>
              <button className='relative h-[52px] w-[52px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
                <BsFillPlayFill size={34} className='text-pink-#9b4de0 ml-[4px] group-hover:text-white z-20' />
                <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
              </button>
            </div>
            <div className='flex items-center justify-start gap-6'>
              <span className='text-grey-#feffffcc text-sm font-medium'>{artistData?.totalFollow} người quan tâm</span>
              <button className='py-[4px] px-[24px] h-7 flex items-center justify-center text-white text-xs font-normal
               bg-grey-#feffff1a rounded-full gap-1 border border-grey-#feffff33 hover:brightness-90'>
                <SlUserFollow size={12} />
                <span className='uppercase'>Quan tâm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-[59px]'>
        {artistData?.sections?.map((item, index) => {
          switch (item.sectionType) {
            case "song":
              return (
                <ArtistSong
                  key={item?.title}
                  songs={item}
                />
              )
            case "playlist":
              return (
                <ArtistPlaylist
                  key={item?.title}
                  playlists={item}
                />
              )
            case "video":
              return (
                <ArtistVideo
                  key={item?.title}
                  videos={item}
                  thumbnail={artistData?.thumbnail}
                />
              )
            case "artist":
              return (
                <ArtistArtist
                  key={item?.title}
                  artists={item}
                />
              )
            default:
              return null
          }
        })}
        <div className='mt-12 flex flex-col'>
          <h3 className='mb-5 text-xl text-white font-bold'>Về {artistData?.name}</h3>
          <div className='flex gap-[30px]'>
            <img
              src={artistData?.thumbnailM}
              alt='avatar artist'
              className='w-[40%] object-cover rounded-[8px]'
            />
            <div className='flex flex-col'>
              <div className='mb-12 flex flex-col '>
                {artistData?.biography.split('<br>').map((typo, index) => (
                  <div className='text-sm text-black-#FFFFFF80 font-normal' key={index}>
                    {typo}
                  </div>
                ))}
              </div>
              <div className='flex flex-start'>
                <div className='flex flex-col gap-1 mr-[52px]'>
                  <span className='text-xl text-white font-bold'>{Number(artistData?.follow).toLocaleString()}</span>
                  <span className='text-sm text-black-#FFFFFF80 font-normal'>Người quan tâm</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xl text-white font-bold'>{artistData?.awards?.length || '0'}</span>
                  <span className='text-sm text-black-#FFFFFF80 font-normal'>Giải thưởng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Artist 