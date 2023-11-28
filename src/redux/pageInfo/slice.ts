import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const initialState = {
  title: '',
  desc: '',
  js: '',
  css: ''
}

export const pageInfoSlice = createSlice({
  name: 'pageInfoSlice',
  initialState,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      state = action.payload
    }
  }
})

export const { resetPageInfo } = pageInfoSlice.actions
