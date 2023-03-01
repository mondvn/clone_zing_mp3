import actionTypes from "./actionTypes";

export const setCurSongId = (songId) => ({
  type: actionTypes.SET_CURRENT_SONG_ID,
  songId
})

export const setCurPlaylistId = (playlistId) => ({
  type: actionTypes.SET_CURRENT_PLAYLIST_ID,
  playlistId
})

export const setCurPlaylist = (playlist) => ({
  type: actionTypes.SET_CURRENT_PLAYLIST,
  playlist
})

export const clearCurPlaylist = () => ({
  type: actionTypes.CLEAR_CURRENT_PLAYLIST,
})

export const setPlaylistBeforeShuffle = (playlist) => ({
  type: actionTypes.SET_PLAYLIST_BEFORE_SHUFFLE,
  playlist
})
export const clearPlaylistBeforeShuffle = () => ({
  type: actionTypes.CLEAR_PLAYLIST_BEFORE_SHUFFLE
})

export const togglePlayMusic = (flag) => ({
  type: actionTypes.TOGGLE_PLAY_MUSIC,
  flag
})

export const toggleShuffle = (flag) => ({
  type: actionTypes.TOGGLE_SHUFFLE,
  flag
})

export const setRepeatValue = (value) => ({
  type: actionTypes.SET_REPEAT_VALUE,
  value
})
export const setHistory = (song) => ({
  type: actionTypes.SET_HISTORY,
  song
})
export const pushSongFromHistoryToCurrentPlaylist = (song) => ({
  type: actionTypes.PUSH_SONG_FROM_HISTORY_TO_CURRENT_PLAYLIST,
  song
})