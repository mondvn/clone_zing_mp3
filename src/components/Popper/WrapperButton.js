import React from 'react'

const WrapperButton = ({ children }) => {
  return (
    <div className='text-white text-xs flex items-center justify-center bg-[#333] p-[10px] rounded-[4px]'>
      {children}
    </div>
  )
}

export default WrapperButton