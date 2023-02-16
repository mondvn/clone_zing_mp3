import { Outlet } from 'react-router-dom'
import { Header, Player, SidebarLeft, SidebarRight } from '../../components'

function Public() {
  return (
    <div className='w-full min-h-screen flex bg-[#1e1e1e]'>
      <div className='w-[240px] flex-none min-h-screen'>
        <SidebarLeft />
      </div>
      <div className='flex-auto overflow-y-auto border border-red-500'>
        <header>
          <Header />
        </header>
        <Outlet />
      </div>
      <div className='w-[329px] flex-none border border-green-500'>
        <SidebarRight />
      </div>
      <div className='fixed h-[90px] w-full bottom-0 right-0 left-0 px-5 cursor-pointer bg-player-bg border-t border-player-border-color'>
        <Player />
      </div>
    </div>
  )
}

export default Public;