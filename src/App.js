import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const { test, homeData } = useSelector(state => state.app)
  console.log({ test, homeData })
  return (
    <div></div>
  );
}

export default App;
