import React from 'react'

import AlbumItem from '../common/AlbumItem';


const Top100Item = ({ sliders }) => {

  return (
    <div className='mt-12'>
      {sliders?.title &&
        <div className='flex mb-5 items-center justify-between'>
          <h3 className='text-white text-xl font-bold'>{sliders?.title}</h3>

        </div>}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 min-[1350px]:grid-cols-5 gap-7 gap-y-10'>
        {sliders?.items?.map((item, index) => (
          <AlbumItem
            key={item?.encodeId}
            albumData={item}
          />
        ))}
      </div>
    </div>
  )
}

export default Top100Item