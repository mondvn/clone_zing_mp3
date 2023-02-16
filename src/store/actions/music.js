import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (songId) => ({
  type: actionTypes.SET_CURRENT_SONG_ID,
  songId
})