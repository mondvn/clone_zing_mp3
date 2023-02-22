import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome()
    // console.log('[home - actions]', response.data.data.items)
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: response.data.data.items
      })
    } else {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME,
      homeData: null
    })
  }
}

export const getHomeData = () => async (dispatch) => {
  try {
    const response = await apis.getHomeData()
    // console.log('[home - actions]', response.data.data.items)
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_HOME_DATA,
        homeData: response.data.data.items
      })
    } else {
      dispatch({
        type: actionTypes.GET_HOME_DATA,
        homeData: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME_DATA,
      homeData: null
    })
  }
}