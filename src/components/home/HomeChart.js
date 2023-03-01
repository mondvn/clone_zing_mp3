import { memo, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { chart } from 'chart.js/auto'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import bgChart from '../../assets/images/bg-chart.jpg'
import icons from '../../ultis/icons'
import * as actions from '../../store/actions'
import * as apis from '../../apis'

const { BsFillPlayFill, RiVipCrown2Line } = icons

const HomeChart = ({ chart, songs }) => {
  const { isPlaying, curSongId } = useSelector(state => state.music)
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
        grid: { color: 'rbga(255,255,255,0.1', drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] }
      },
      x: {
        ticks: { color: 'white' },
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

  console.log(tooltipState)
  useEffect(() => {
    const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        // console.log(chart?.items[Object.keys(chart?.items)[i]])
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
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
  }, [chart])

  return (
    <div className='mt-12  text-white relative overflow-hidden rounded-[8px]'>
      <img src={bgChart} alt='bg-chart' className='object-cover rounded-[8px] w-full h-[420px]' />
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#740091] to-[#2d1a4c] opacity-95'></div>
      <div className='absolute top-5 left-5 right-5 bottom-5 flex flex-col gap-5'>
        <Link to='/zing-chart' className=' text-[28px] font-bold'>#zingchart</Link>
        <div className='flex gap-7'>
          <div className='flex-4'>
            {songs?.filter((_, index) => index < 3)?.map((item, index) => (
              <div
                className={`
                flex items-center justify-between text-player-text-color py-[10px] px-[15px] text-xs group
                bg-[#ffffff12] mb-[15px] rounded-[4px]
                ${item?.encodeId === curSongId ? 'bg-[#ffffff12]' : 'hover:bg-[#ffffff33]'}`}
                key={index}>
                <div className={`flex items-center justify-center font-black text-[32px] mr-[15px] text-[#4a90e200] text-stroke-zc-${index}`}>{index + 1}</div>
                <div className='flex flex-1'>
                  <div className='flex relative mr-[10px]'>
                    <img src={item?.thumbnail} alt='song thumb' className='h-[60px] w-[60px] rounded-sm object-contain' />

                    <div className={`absolute w-full h-full top-0 left-0 bg-[#00000080] ${item?.encodeId === curSongId ? 'flex' : 'hidden group-hover:flex'}`}></div>

                    <div className={`absolute w-full h-full top-0 left-0 items-center justify-center flex`}>
                      <button className='text-white flex items-center justify-center'>
                        {(item?.encodeId === curSongId && isPlaying) &&
                          <div className='w-6 h-6 flex items-center justify-center'>
                            <img
                              src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                              alt='gif playing'
                              className='w-6 h-6'
                            />
                          </div>}
                        {(item?.encodeId === curSongId && !isPlaying) &&
                          <div className='w-7 h-7 flex items-center justify-center'>
                            <BsFillPlayFill size={28} />
                          </div>}
                      </button>
                      {item?.encodeId !== curSongId &&
                        <button className='text-white items-center justify-center hidden group-hover:flex '>
                          <BsFillPlayFill size={28} />
                        </button>}
                    </div>
                  </div>
                  <div className='flex flex-col justify-evenly text-xs font-medium text-black-#FFFFFF80'>
                    <div className='flex justify-start text-sm text-primary-text-color gap-[6px]'>
                      <div className='line-clamp-1'>{item?.title}</div>
                      <div className={`${!item?.isWorldWide ? 'flex' : 'hidden'} items-center justify-center text-yellow-300`}><RiVipCrown2Line size={16} /></div>
                    </div>
                    <h3 className='flex gap-1'>
                      {item?.artists?.map((artist, index) => (
                        <Link key={artist?.id} className='hover:text-pink-#9b4de0'>{artist?.name}</Link>
                      ))}
                    </h3>
                  </div>
                </div>
                <div className='text-white font-bold text-base hidden group-hover:flex'>{Math.floor(item?.score * 100 / chart?.totalScore)}%</div>
              </div>
            ))}
            <button className='flex items-center justify-center px-[25px] py-[5px] border border-white 
            rounded-full font-medium text-sm mx-auto hover:bg-black-#ffffff1a'>Xem Thêm</button>
          </div>
          <div className='flex-6 relative'>
            {data && <Line data={data} ref={lineChartRef} options={options} />}
            <div className='tooltip' style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}>
              tooltip
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HomeChart)