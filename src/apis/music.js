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

// export const apiTest = (url) => new Promise(async (resolve, reject) => {
//   try {
//     var myHeaders = new Headers();
//     myHeaders.append("Cookie", "zmp3_rqid=MHwxODMdUngODAdUngMzgdUngMTEzfG51WeBGx8MTY3NjYzNzIzMTmUsIC2MQ");
//     myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//     myHeaders.append('Access-Control-Allow-Credentials', 'true');

//     myHeaders.append('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, Session-Key , Api-Key');
//     myHeaders.append('Access-Control-Request-Method', 'GET, POST , OPTIONS ,PUT, DELETE, PATCH');
//     myHeaders.append('Content-Type', 'application/json;charset=utf-8');

//     var urlencoded = new URLSearchParams();
//     const response = await axios({
//       url,
//       method: 'GET',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow',
//     })
//     resolve(response)
//   } catch (error) {
//     reject(error)
//   }
// })