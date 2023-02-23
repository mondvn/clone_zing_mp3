import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Header, Player, SidebarLeft, SidebarRight } from '../../components'

function Public() {
  return (
    <div className='w-full h-screen flex bg-[#1e1e1e]'>
      <div className='w-[240px] flex-none h-full '>
        <SidebarLeft />
      </div>
      <div className='flex-auto w-full h-full pb-[90px]'>
        <header>
          <Header />
        </header>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <div className='mt-[70px] pb-5'>
            <Outlet />
          </div>
        </Scrollbars>
      </div>
      <div className='w-[329px] flex-none border border-green-500 animate-slide-left '>
        <SidebarRight />
      </div>
      <div className='fixed h-[90px] bottom-0 right-0 left-0 px-5 bg-player-bg border-t border-player-border-color'>
        <Player />
      </div>
    </div>
  )
}

export default Public;