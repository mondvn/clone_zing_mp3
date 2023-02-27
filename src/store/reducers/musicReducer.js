import actionTypes from "../actions/actionTypes";

const initState = {
  isPlaying: false,
  isShuffle: false,
  repeatValue: 0,
  curSongId: null,
  curPlaylistId: null,
  curPlaylist: {
    title: '',
    link: '',
    songs: [],
  },
  playlistBeforeShuffle: {
    title: '',
    link: '',
    songs: [],
  }
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
      return {
        ...state,
        curPlaylist: { ...action.playlist } || null
      }
    case actionTypes.SET_PLAYLIST_BEFORE_SHUFFLE:
      console.log(action.playlist)
      return {
        ...state,
        playlistBeforeShuffle: { ...action.playlist } || null
      }
    case actionTypes.TOGGLE_PLAY_MUSIC:
      return {
        ...state,
        isPlaying: action.flag
      }
    case actionTypes.TOGGLE_SHUFFLE:
      return {
        ...state,
        isShuffle: action.flag
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