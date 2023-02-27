import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Header, Player, SidebarLeft, PlayerPlaylist } from '../../components'

function Public() {
  const { isShowPlaylist } = useSelector(state => state.app)
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
      {isShowPlaylist && <div className='w-[329px] pb-[90px] flex-none border-l border-black-#353535'>
        <PlayerPlaylist />
      </div>}
      <div className='fixed h-[90px] bottom-0 right-0 left-0 px-5 bg-black-#181818 border-t border-black-#353535'>
        <Player />
      </div>
    </div>
  )
}

export default Public;