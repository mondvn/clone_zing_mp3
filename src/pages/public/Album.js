import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import * as apis from '../../apis'
import { AlbumPlayList } from '../../components'
import icons from '../../ultis/icons'

const { BsFillPlayFill, SlHeart, BsThreeDots } = icons

const Album = () => {
  const { title, pid } = useParams()
  const [playListData, setPlayListData] = useState(null)

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid)
      // console.log(response?.data?.data)
      if (response?.data?.err === 0) {
        setPlayListData(response?.data?.data)
      }
    }

    fetchDetailPlaylist()
  }, [pid])

  return (
    <div className='relative pt-[40px] flex flex-1 mx-[59px] h-full'>
      <div className='fixed flex flex-col w-[300px]'>
        <div>
          <img
            src={playListData?.thumbnailM}
            alt='thumbnail'
            className='w-full object-contain rounded-md shadow-sm'
          />
        </div>
        <div className='mt-3 flex flex-col items-center justify-center'>
          <h3 className='font-bold text-[20px] text-primary-text-color'>{playListData?.title}</h3>
          <span className='text-xs text-player-text-color leading-[21px]'>
            {`Cập nhật: ${moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}`}
          </span>
          <span className='text-xs text-player-text-color leading-[21px]'>{playListData?.artistsNames}</span>
          <span className='text-xs text-player-text-color leading-[21px]'>{`${Math.floor(playListData?.like / 1000)}k người yêu thích`}</span>
        </div>
        <div className='mt-4 flex flex-col items-center justify-center'>
          <button className='flex items-center justify-center gap-[5px] text-primary-text-color bg-button-primary-bg rounded-full text-sm py-[9px] px-[20px] hover:brightness-90'>
            <BsFillPlayFill size={20} />
            Phát Ngẫu Nhiên
          </button>
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
          <span className='text-player-text-color text-sm'>Lời tựa</span>
          <span className='text-primary-text-color text-sm'>{playListData?.description}</span>
        </div>
        <AlbumPlayList songs={playListData?.song} />
      </div>
    </div>
  )
}

export default Album