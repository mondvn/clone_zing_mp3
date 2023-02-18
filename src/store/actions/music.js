import actionTypes from "./actionTypes";

export const setCurSongId = (songId) => ({
  type: actionTypes.SET_CURRENT_SONG_ID,
  songId
})

export const togglePlayMusic = (flag) => ({
  type: actionTypes.TOGGLE_PLAY_MUSIC,
  flag
})
export const togglePlayOnAlbum = (flag) => ({
  type: actionTypes.TOGGLE_PLAY_ON_ALBUM,
  flag
})