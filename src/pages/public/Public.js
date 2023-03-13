import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Header, Player, SidebarLeft, PlayerPlaylist } from '../../components'

function Public() {
  const [headerColor, setHeaderColor] = useState('transparent');
  const [isTransparent, setIsTransparent] = useState(true)

  const handleScroll = (event) => {
    const position = event.target.scrollTop;
    if (position > 70) {
      setHeaderColor('#1e1e1ecc');
      setIsTransparent(false)
    } else {
      setHeaderColor('transparent');
      setIsTransparent(true)
    }
  };
  const { isShowPlaylist } = useSelector(state => state.app)
  return (
    <div className='relative w-full h-screen flex bg-[#1e1e1e] antialiased'>
      <div className='flex-none h-full '>
        <SidebarLeft />
      </div>
      <div className='flex-auto w-full h-full pb-[90px]'>
        <header>
          <Header headerColor={headerColor} isTransparent={isTransparent} />
        </header>
        <Scrollbars style={{ width: '100%', height: '100%' }} onScroll={handleScroll}>
          <div className='mt-[70px] pb-5'>
            <Outlet />
          </div>
        </Scrollbars>
      </div>
      {isShowPlaylist && <div className=''>
        <PlayerPlaylist />
      </div>}
      <div className='fixed z-[999] h-[90px] bottom-0 right-0 left-0 px-5 bg-black-#181818 border-t border-black-#353535'>
        <Player />
      </div>
    </div>
  )
}

export default Public;