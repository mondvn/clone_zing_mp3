import actionTypes from "../actions/actionTypes";

const initState = {
  curSongId: null
}

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG_ID:
      return {
        ...state,
        curSongId: action.songId || null
      }

    default:
      return state
  }
}

export default musicReducer