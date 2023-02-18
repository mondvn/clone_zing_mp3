import actionTypes from "../actions/actionTypes";

const initState = {
  curSongId: null,
  isPlaying: false,
  isPlayingOnAlbum: false,
}

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG_ID:
      return {
        ...state,
        curSongId: action.songId || null
      }
    case actionTypes.TOGGLE_PLAY_MUSIC:
      return {
        ...state,
        isPlaying: action.flag
      }
    case actionTypes.TOGGLE_PLAY_ON_ALBUM:
      return {
        ...state,
        isPlayingOnAlbum: action.flag
      }

    default:
      return state
  }
}

export default musicReducer