import React from 'react'
import icons from '../ultis/icons'

const { FiSearch, VscClose } = icons

const Search = () => {
  return (
    <div className='flex items-center bg-[#333] h-10 w-[440px] rounded-[20px] text-[#757575]'>
      <div className='ml-[8px] mr-2'>
        <FiSearch size={22} />
      </div>
      <input
        className='flex-auto outline-none text-[14px] font-norma bg-[#333] text-white placeholder:text-[#757575]'
        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
      />
      <div className='mr-[10px] ml-2'>
        <VscClose size={20} />
      </div>
    </div>
  )
}

export default Search