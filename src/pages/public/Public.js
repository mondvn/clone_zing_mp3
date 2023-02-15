import { Outlet } from 'react-router-dom'
import { Header, SidebarLeft, SidebarRight } from '../../components'

function Public() {
  return (
    <div className='w-full flex bg-[#292929]'>
      <div className='w-[240px] flex-none'>
        <SidebarLeft />
      </div>
      <div className='flex-auto'>
        <header>
          <Header />
        </header>
        <Outlet />
      </div>
      <div className='w-[329px] flex-none'>
        <SidebarRight />
      </div>
    </div>
  )
}

export default Public;