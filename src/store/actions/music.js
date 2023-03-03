import actionTypes from "./actionTypes";
import * as apis from "../../apis"

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
export const setSearchData = (searchValue) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(searchValue)
    if (response.data.err === 0) {
      dispatch({ type: actionTypes.SET_SEARCH_DATA, data: response.data.data })
    } else {
      dispatch({ type: actionTypes.SET_SEARCH_DATA, data: null })
    }
  } catch (error) {
    dispatch({ type: actionTypes.SET_SEARCH_DATA, data: null })
  }
}