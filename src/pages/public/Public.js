import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Header, Player, SidebarLeft, SidebarRight } from '../../components'

function Public() {
  return (
    <div className='w-full h-screen flex bg-[#1e1e1e]'>
      <div className='w-[240px] flex-none h-full'>
        <SidebarLeft />
      </div>
      <div className='flex-auto w-full h-full'>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <header>
            <Header />
          </header>
          <div className='mt-[70px] mb-[90px]'>
            <Outlet />
          </div>
        </Scrollbars>
      </div>
      <div className='w-[329px] hidden 1600:flex flex-none border border-green-500 animate-slide-left '>
        <SidebarRight />
      </div>
      <div className='fixed h-[90px] bottom-0 right-0 left-0 px-5 bg-player-bg border-t border-player-border-color'>
        <Player />
      </div>
    </div>
  )
}

export default Public;