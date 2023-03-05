import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "swiper/css";
// import "swiper/css/navigation";

import { Home, Public, Login, MyMusic, Album, Hub, NewMusic, Top100, MusicVideo, Search, SearchSongs, SearchAll, SearchPlaylist, SearchArtist } from './pages/public'
import path from './ultis/path'
import * as actions from './store/actions'
import Artist from './pages/public/Artist';
import ZingChart from './pages/public/ZingChart';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHomeData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<MyMusic />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />

            <Route path={path.HUB} element={<Hub />} />
            <Route path={path.NEW_MUSIC} element={<NewMusic />} />
            <Route path={path.TOP_100} element={<Top100 />} />
            <Route path={path.MUSIC_VIDEO} element={<MusicVideo />} />
            <Route path={path.SEARCH} element={<Search />} >
              <Route path={path.SEARCH_ALL} element={<SearchAll />} />
              <Route path={path.SEARCH_SONGS} element={<SearchSongs />} />
              <Route path={path.SEARCH_PLAYLISTS} element={<SearchPlaylist />} />
              <Route path={path.SEARCH_ARTIST} element={<SearchArtist />} />
            </Route>
            <Route path={path.ARTIST} element={<Artist />} />
            <Route path={path.ARTIST_2ND} element={<Artist />} />

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
