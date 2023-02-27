import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  homeData: [],
  isShowPlaylist: true,
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME_DATA:
      // console.log('[appReducer - GET_HOME_DATA]: ', action.homeData)
      return {
        ...state,
        homeData: action.homeData || null
      }
    case actionTypes.TOGGLE_SHOW_PLAYLIST:
      return {
        ...state,
        isShowPlaylist: action.flag
      }


    default:
      return state
  }
}

export default appReducer