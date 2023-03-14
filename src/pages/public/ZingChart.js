import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import { chart } from 'chart.js/auto'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { toast } from 'react-toastify'

import * as apis from '../../apis'
import * as actions from '../../store/actions'
import bgChart from '../../assets/images/bg-chart.jpg'
import weekChart from '../../assets/images/week-chart-bg.jpg'
import icons from '../../ultis/icons'
import ZingChartSong from '../../components/zingChart/ZingChartSong'

const { BsFillPlayFill } = icons

const ZingChart = () => {
  const dispatch = useDispatch()
  const { curPlaylistId, isPlaying, curSongId, isShuffle, curPlaylist } = useSelector(state => state.music)
  const [chartData, setChartData] = useState(null)
  const [data, setData] = useState(null)
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  })
  const lineChartRef = useRef()
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspecRaido: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: '#FFFFFF1a', drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] }
      },
      x: {
        ticks: { color: '#FFFFFF80' },
        grid: { color: 'transparent' }
      }
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!lineChartRef || !lineChartRef.current) return
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
            return
          }
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY
          }

          if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
        }
      }
    },
    hover: {
      mode: 'dataset',
      intersect: false,
    }
  }

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apis.apiGetChartHome()
      console.log(response?.data?.data)
      if (response?.data?.err === 0) {
        setChartData(response?.data?.data)
      }
    }

    fetchChartData()

  }, [])

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        // console.log(chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]])
        datasets.push({
          data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 4,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          pointHoverBorderWidth: 4
        })
      }
      setData({ labels, datasets })
    }
  }, [chartData])


  const handlePlaySong = (encodeId) => {
    dispatch(actions.setCurPlaylistId(''))
    if (curSongId === encodeId) {
      dispatch(actions.togglePlayMusic(!isPlaying))
    } else {
      dispatch(actions.setCurSongId(encodeId))
      if (isShuffle) {
        const arr = chartData?.RTChart?.items?.filter(item => item.isWorldWide)
        const currentSongIndex = chartData?.RTChart?.items?.findIndex(item => item.encodeId === encodeId)
        const data = {
          title: '',
          link: '',
          songs: arr
        }
        const dataShuffle = {
          ...data,
          songs: [
            chartData?.RTChart?.items[currentSongIndex],
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
          songs: [...chartData?.RTChart?.items.filter(item => item.isWorldWide)]
        }))
      }
      dispatch(actions.togglePlayMusic(false))
    }
  }
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

  const handleTogglePlay = () => {
    isPlaying ? dispatch(actions.togglePlayMusic(false)) : dispatch(actions.togglePlayMusic(true))
  }
  return (
    <div className=''>
      <div className='mt-[-70px] min-h-[200px] text-white relative overflow-hidden'>
        <img src={bgChart} alt='bg-chart' className='object-cover w-full h-full grayscale' />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff00] to-[#1e1e1e] opacity-90'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#1e1e1e] opacity-90'></div>
        <div className='absolute top-5 left-5 right-5 bottom-5 flex flex-col gap-5 mx-[29px] lg:mx-[59px]'>
          <div className='flex items-center pt-[110px] gap-2'>
            <span className='text-[40px] font-extrabold'>#zingchart</span>
            <button
              onClick={() => handlePlaySong(chartData?.RTChart?.items[0]?.encodeId)}
              className='relative h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
              <BsFillPlayFill size={26} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
              <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
            </button>
          </div>
          <div className='hidden md:flex relative'>
            {data && <Line data={data} ref={lineChartRef} options={options} />}
            <div className='tooltip' style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}>
              tooltip
            </div>
          </div>
        </div>
      </div>
      <div className='mx-[29px] lg:mx-[59px] mt-1'>
        <ZingChartSong
          isShowButton={true}
          songs={chartData?.RTChart}
          lengthChart={10}
          textColor={true}
          isShowAlbum={true}
          numberWidth={60}
          borderBottom={true}
          isTop100={true}
        />
      </div>
      <div className='mt-6 relative'>
        <img src={weekChart} alt='bg-chart' className='object-cover w-full h-[560px] grayscale' />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ffffff00] to-[#1e1e1e] opacity-90'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#1e1e1e] opacity-90'></div>
        <div className='absolute top-5 left-5 right-5 bottom-5 mx-[29px] lg:mx-[59px]'>
          <div className='text-white text-[40px] font-extrabold mb-5'>Bảng Xếp Hạng Tuần</div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 '>
            <div className='flex flex-col py-5 px-[10px] rounded-[16px] bg-[#ffffff0d]'>
              <div className='flex items-center justify-center mb-[10px] gap-[5px]'>
                <Link to={chartData?.weekChart?.vn?.link.split('.')[0]} className=' text-[24px] text-white font-bold'>Việt Nam</Link>
                <button
                  onClick={chartData?.weekChart?.vn?.playlistId === curPlaylistId ? handleTogglePlay : () => handlePlayAlbum(chartData?.weekChart?.vn?.playlistId)}
                  className='relative h-[29px] w-[29px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
                  <BsFillPlayFill size={20} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
                  <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
                </button>
              </div>
              <ZingChartSong
                isShowButton={true}
                songs={chartData?.weekChart?.vn}
                lengthChart={5}
                textColor={false}
                isShowAlbum={false}
                numberWidth={32}
                borderBottom={false}
                isTop100={false}
                link={chartData?.weekChart?.vn?.link.split('.')[0]}
              />
            </div>
            <div className='flex flex-col py-5 px-[10px] rounded-[16px] bg-[#ffffff0d]'>
              <div className='flex items-center justify-center mb-[10px] gap-[5px]'>
                <Link to={chartData?.weekChart?.us?.link.split('.')[0]} className=' text-[24px] text-white font-bold'>US-UK</Link>
                <button
                  onClick={chartData?.weekChart?.us?.playlistId === curPlaylistId ? handleTogglePlay : () => handlePlayAlbum(chartData?.weekChart?.us?.playlistId)}
                  className='relative h-[29px] w-[29px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
                  <BsFillPlayFill size={20} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
                  <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
                </button>
              </div>
              <ZingChartSong
                isShowButton={true}
                songs={chartData?.weekChart?.us}
                lengthChart={5}
                textColor={false}
                isShowAlbum={false}
                numberWidth={32}
                borderBottom={false}
                isTop100={false}
                link={chartData?.weekChart?.us?.link.split('.')[0]}
              />
            </div>
            <div className='flex flex-col py-5 px-[10px] rounded-[16px] bg-[#ffffff0d]'>
              <div className='flex items-center justify-center mb-[10px] gap-[5px]'>
                <Link to={chartData?.weekChart?.korea?.link.split('.')[0]} className=' text-[24px] text-white font-bold'>K-Pop</Link>
                <button
                  onClick={chartData?.weekChart?.korea?.playlistId === curPlaylistId ? handleTogglePlay : () => handlePlayAlbum(chartData?.weekChart?.korea?.playlistId)}
                  className='relative h-[29px] w-[29px] bg-white rounded-full flex items-center justify-center group hover:bg-transparent'>
                  <BsFillPlayFill size={20} className='text-pink-#9b4de0 ml-[3px] group-hover:text-white z-20' />
                  <div className='absolute top-0 bottom-0 left-0 right-0 rounded-full duration-300 transfrom scale-0 group-hover:scale-100 group-hover:bg-pink-#9b4de0 ease-out'></div>
                </button>
              </div>
              <ZingChartSong
                isShowButton={true}
                songs={chartData?.weekChart?.korea}
                lengthChart={5}
                textColor={false}
                isShowAlbum={false}
                numberWidth={32}
                borderBottom={false}
                isTop100={false}
                link={chartData?.weekChart?.korea?.link.split('.')[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZingChart