import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  homeData: [],
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      // console.log('[appReducer - reducer]: ', action.homeData)
      return {
        ...state,
        banner: action.homeData?.find(item => item.sectionType === 'banner').items || null
      }
    case actionTypes.GET_HOME_DATA:
      // console.log('[appReducer - GET_HOME_DATA]: ', action.homeData)
      return {
        ...state,
        homeData: action.homeData || null
      }

    default:
      return state
  }
}

export default appReducer