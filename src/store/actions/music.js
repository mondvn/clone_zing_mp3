import actionTypes from "./actionTypes";

export const setCurSongId = (songId) => ({
  type: actionTypes.SET_CURRENT_SONG_ID,
  songId
})

export const togglePlayMusic = (flag) => ({
  type: actionTypes.TOGGLE_PLAY_MUSIC,
  flag
})