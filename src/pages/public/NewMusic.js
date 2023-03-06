import React, { useEffect } from 'react'
import * as apis from '../../apis'


const NewMusic = () => {
  useEffect(() => {
    const fetchNewRelease = async () => {
      const response = await apis.apiGetNewReleaseChart()
      console.log(response)
    }
    fetchNewRelease()
  }, [])
  return (
    <div>NewMusic</div>
  )
}

export default NewMusic