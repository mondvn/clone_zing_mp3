import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Home, Public, Login, MyMusic, Album, Hub, NewMusic, Top100, MusicVideo } from './pages/public'
import path from './ultis/path'
import * as actions from './store/actions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
    dispatch(actions.getHomeData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<MyMusic />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />

            <Route path={path.HUB} element={<Hub />} />
            <Route path={path.NEW_MUSIC} element={<NewMusic />} />
            <Route path={path.TOP_100} element={<Top100 />} />
            <Route path={path.MUSIC_VIDEO} element={<MusicVideo />} />

          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
