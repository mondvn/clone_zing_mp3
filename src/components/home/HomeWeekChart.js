import React from 'react'
import { Link } from 'react-router-dom'

const HomeWeekChart = ({ charts }) => {
  console.log(charts)
  return (
    <div className='mt-12 mb-3 grid grid-cols-1 md:grid-cols-3 gap-y-7 md:gap-7'>
      {charts?.map(chart => (
        <Link
          key={chart?.country}
          to={chart.link}
          className='rounded-[5px] overflow-hidden'>
          <img
            src={chart?.cover}
            alt='cover chart'
            className='mx-auto transform scale-100 duration-500 hover:scale-110'
          />
        </Link>
      ))}
    </div>
  )
}

export default HomeWeekChart