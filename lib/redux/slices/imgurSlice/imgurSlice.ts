import { ImgurGallery } from '@/app/api/imgur/route'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: ImgurSliceState = {
  feedGalleries: [],
  selected: null,
  section: "top",
  sort: "top",
  window: "day",
  page: 1,
  showViral: true,
  loading: false,
}

export const imgurSlice = createSlice({
  name: 'imgur',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<FeedGallery[]>) => {
      return {
        ...state,
        feedGalleries: action.payload,
      }
    },
    setSelected: (state, action: PayloadAction<ImgurGallery | null>) => {
      return {
        ...state,
        selected: action.payload,
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
    setSection: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        feedGalleries: [],
        page: 1,
        section: action.payload
      }
    },
    setWindow: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        feedGalleries: [],
        page: 1,
        window: action.payload
      }
    },
    setSort: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        feedGalleries: [],
        page: 1,
        sort: action.payload
      }
    },
    setShowViral: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        feedGalleries: [],
        page: 1,
        showViral: action.payload
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        page: action.payload
      }
    },
  },
})

export type ImgurSliceState = {
  feedGalleries: FeedGallery[];
  selected: ImgurGallery | null 
  section: string
  sort: string
  page: number
  window: string
  showViral: boolean
  loading: boolean
}

export type FeedGallery = {
  id: string,
  title: string,
  isAlbum: boolean,
  redirectLink: string,
  cover: {
    link: string,
    height: number,
    width: number,
    type: string
  }
}
