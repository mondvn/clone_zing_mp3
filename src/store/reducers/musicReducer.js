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
  },
  history: {
    songs: []
  },
  searchData: {},
  playlistFavoriteSong: []
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
    case actionTypes.CLEAR_CURRENT_PLAYLIST:
      return {
        ...state,
        curPlaylist: {
          title: '',
          link: '',
          songs: [],
        }
      }
    case actionTypes.SET_PLAYLIST_BEFORE_SHUFFLE:
      console.log(action.playlist)
      return {
        ...state,
        playlistBeforeShuffle: { ...action.playlist } || null
      }
    case actionTypes.CLEAR_PLAYLIST_BEFORE_SHUFFLE:
      return {
        ...state,
        playlistBeforeShuffle: {
          title: '',
          link: '',
          songs: [],
        }
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
    case actionTypes.SET_HISTORY:
      // Xử lý trùng bài hát
      let curPlaylist = []
      const checkSameSong = state.history.songs.some(song => song.encodeId === action.song.encodeId)
      checkSameSong
        ? curPlaylist = [...state.history.songs.slice().filter(song => song.encodeId !== action.song.encodeId)]
        : curPlaylist = [...state.history.songs]

      // Xử lý nếu list hơn 20 bài hát
      if (curPlaylist.length >= 20) curPlaylist.shift()
      return {
        ...state,
        history: {
          songs: [...curPlaylist, action.song] || null
        }
      }
    case actionTypes.SET_SEARCH_DATA:
      return {
        ...state,
        searchData: action.data || null
      }
    case actionTypes.ADD_FAVORITE_SONG:
      // console.log('action.song', action.song)
      return {
        ...state,
        playlistFavoriteSong: [...state.playlistFavoriteSong, action.song] || null
      }
    case actionTypes.DEL_FAVORITE_SONG:
      // console.log('action.songId', action.songId)
      return {
        ...state,
        playlistFavoriteSong: [...state.playlistFavoriteSong.filter(item => item.encodeId !== action.songId)]
      }
    default:
      return state
  }
}

export default musicReducer