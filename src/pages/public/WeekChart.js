import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as apis from '../../apis'
import * as actions from '../../store/actions'
import weekChartBg from '../../assets/images/week-chart-bg.jpg'
import icons from '../../ultis/icons'
import ZingChartSong from '../../components/zingChart/ZingChartSong'
import Scrollbars from 'react-custom-scrollbars-2'

const { BsFillPlayFill } = icons
const activeStyle = 'py-4 text-white text-[24px] font-bold uppercase border-b-2 border-pink-#c273ed'
const notActiveStyle = 'py-4 text-grey-#a0a0a0 text-[24px] font-bold uppercase border-b-2 border-transparent'

const WeekChart = () => {

  const { filter } = useParams()
  const dispatch = useDispatch()
  const [listSong, setListSong] = useState(null)
  const [weekChart, setWeekChart] = useState(null)

  useEffect(() => {
    dispatch(actions.getHomeData())
    const fetchChartData = async () => {
      const response = await apis.apiGetChartHome()
      console.log(response?.data?.data)
      if (response?.data?.err === 0) {
        setWeekChart(Object.values(response?.data?.data?.weekChart))
      }
    }

    fetchChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filter && weekChart) { filter === "Bai-hat-Viet-Nam" ? setListSong(weekChart[0]) : filter === "Bai-hat-US-UK" ? setListSong(weekChart[1]) : setListSong(weekChart[2]) }

  }, [filter, weekChart])

  return (
    <div>
      <div className='mt-[-70px] text-white relative h-[90vh]'>
        <img src={weekChartBg} alt='bg-chart' className='object-cover w-full h-full grayscale' />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff00] to-[#1e1e1e] opacity-90'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#1e1e1e] opacity-90'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-5 mx-[29px] lg:mx-[59px] h-full'>
          <div className='flex items-center pt-[110px] gap-2'>
            <span className='text-[40px] font-extrabold'>Bảng Xếp Hạng Tuần</span>
            <button
              // onClick={chartData?.weekChart?.vn?.playlistId === curPlaylistId ? handleTogglePlay : () => handlePlayAlbum(chartData?.weekChart?.vn?.playlistId)}
              className='relative h-[46px] w-[46px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
              <BsFillPlayFill size={30} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
              <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
            </button>
          </div>
          <div className='flex gap-[40px]'>
            {weekChart?.map((item) => (
              <NavLink
                to={item?.link?.split('.')[0]}
                key={item?.country}
                // className='py-4 text-grey-#a0a0a0 text-[24px] font-bold uppercase border-b-2 border-transparent hover:text-white'
                className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
              >
                {item.country === "vn" ? 'Việt Nam' : item.country === 'us' ? 'US-UK' : 'K-Pop'}
              </NavLink>
            ))}
          </div>
          <Scrollbars style={{ width: '100%', height: '70vh' }}>
            <div className='mt-1 w-full h-full ml-[-10px]'>
              <ZingChartSong
                songs={listSong}
                lengthChart={listSong?.items?.length}
                textColor={false}
                isShowAlbum={true}
                numberWidth={60}
                borderBottom={true}
                isShowButton={false}
              />
            </div>
          </Scrollbars>
        </div>
      </div>

    </div>
  )
}

export default WeekChart