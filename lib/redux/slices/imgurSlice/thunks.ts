import { fetchGallery } from './fetchGallery'
import { fetchImages } from './fetchImages'
import { imgurSlice } from './imgurSlice'
import type { ReduxThunkAction } from '@/lib/redux'

export const fetchImagesAsync =
  (append = false): ReduxThunkAction =>
  async (dispatch, getState) => {
    dispatch(imgurSlice.actions.setLoading(true))
    !append && dispatch(imgurSlice.actions.setImages([]))
    const { imgur } = getState()
    fetchImages(
      imgur.window,
      imgur.page,
      imgur.section,
      imgur.sort,
      imgur.showViral
    ).then(response => {
      dispatch(imgurSlice.actions.setLoading(false))
      const newImages = [...imgur.feedGalleries, ...response.data] 
      dispatch(imgurSlice.actions.setImages(newImages))
    })
  }

export const fetchMoreImagesAsync =
  (): ReduxThunkAction =>
  async (dispatch, getState) => {
    const { imgur } = getState()
    dispatch(imgurSlice.actions.setPage(imgur.page + 1))
    dispatch(fetchImagesAsync(true))
  }
  

export const fetchGalleryAsync =
  (id: string, isAlbum: boolean): ReduxThunkAction =>
  async (dispatch) => {
    dispatch(imgurSlice.actions.setLoading(true))
    dispatch(imgurSlice.actions.setSelected(null))
    fetchGallery(id, isAlbum).then(response => {
      dispatch(imgurSlice.actions.setLoading(false))
      dispatch(imgurSlice.actions.setSelected(response.data))
    })
  }

