import React from 'react'

const Wrapper = ({ children }) => {
  return (
    <div className='w-full min-h-[100px] max-h-[80vh] bg-[#333] py-[13px] px-[10px] rounded-br-[20px] rounded-bl-[20px] shadow-md shadow-[##20212447]'>
      {children}
    </div>
  )
}

export default Wrapper  