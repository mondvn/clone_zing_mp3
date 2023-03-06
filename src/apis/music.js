import axios from '../axios'

export const apiGetSong = (songId) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/song',
      method: 'get',
      params: {
        id: songId
      }
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetInfoSong = (songId) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/infosong',
      method: 'get',
      params: {
        id: songId
      }
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetDetailPlaylist = (pid) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/detailplaylist',
      method: 'get',
      params: {
        id: pid
      }
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiSearch = (keyword) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/search',
      method: 'get',
      params: { keyword }
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetArtistSongs = (singerId) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/artistsong',
      method: 'get',
      params: {
        id: singerId,
        page: 1,
        count: 50
      }
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetArtist = (alias) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/artist',
      mehthod: 'get',
      params: { name: alias }
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetChartHome = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/charthome',
      mehthod: 'get',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetTop100 = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/top100',
      mehthod: 'get',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetNewReleaseChart = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      url: '/newreleasechart',
      mehthod: 'get',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})