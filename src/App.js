// import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Home, Public, Login } from './pages/public'
import path from './ultis/path'

function App() {
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
