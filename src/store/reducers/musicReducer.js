import actionTypes from "../actions/actionTypes";

const initState = {
  isPlaying: false,
  repeatValue: 0,
  curSongId: null,
  curPlaylistId: null,
  curPlaylist: {}
}

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG_ID:
      return {
        ...state,
        curSongId: action.songId || null
      }
    case actionTypes.SET_CURRENT_PLAYLIST_ID:
      return {
        ...state,
        curPlaylistId: action.playlistId || null
      }
    case actionTypes.SET_CURRENT_PLAYLIST:
      console.log(action.playlist)
      return {
        ...state,
        curPlaylist: { ...action.playlist } || null
      }
    case actionTypes.TOGGLE_PLAY_MUSIC:
      return {
        ...state,
        isPlaying: action.flag
      }
    case actionTypes.SET_REPEAT_VALUE:
      return {
        ...state,
        repeatValue: action.value
      }
    default:
      return state
  }
}

export default musicReducer