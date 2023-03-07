import actionTypes from "./actionTypes";

export const addFavoriteSong = (song) => ({
  type: actionTypes.ADD_FAVORITE_SONG,
  song
})

export const delFavoriteSong = (songId) => ({
  type: actionTypes.DEL_FAVORITE_SONG,
  songId
})

export const addFavoriteAlbum = (album) => ({
  type: actionTypes.ADD_FAVORITE_ALBUM,
  album
})

export const delFavoriteAlbum = (pid) => ({
  type: actionTypes.DEL_FAVORITE_ALBUM,
  pid
})