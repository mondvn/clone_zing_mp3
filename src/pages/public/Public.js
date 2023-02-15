import { Outlet } from 'react-router-dom'
import { SidebarLeft, SidebarRight } from '../../components'

function Public() {
  return (
    <div className='w-full flex overflow-y-auto bg-[#292929]'>
      <div className='w-[240px] flex-none'>
        <SidebarLeft />
      </div>
      <div className='flex-auto'>
        <Outlet />
      </div>
      <div className='w-[329px] flex-none'>
        <SidebarRight />
      </div>
    </div>
  )
}

export default Public;