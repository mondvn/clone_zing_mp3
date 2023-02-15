import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Home, Public, Login } from './pages/public'
import path from './ultis/path'
import * as actions from './store/actions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
  }, [])

  return (
    <div>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.Home} element={<Home />} />
          <Route path={path.Login} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
