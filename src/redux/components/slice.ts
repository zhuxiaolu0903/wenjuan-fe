import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getQuestionService } from '../../services/question'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { resetPageInfo } from '../pageInfo/slice'

export type ComponentInfoType = {
  fe_id: string // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  loading: boolean
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const initialState: ComponentsStateType = {
  loading: false,
  selectedId: '',
  componentList: []
}

export const loadPageData = createAsyncThunk(
  'componentsSlice/loadPageData',
  async (id: string) => await getQuestionService(id)
)

export const componentsSlice = createSlice({
  name: 'componentsSlice',
  initialState,
  reducers: {
    // 修改 selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    }
  },
  extraReducers: {
    [loadPageData.pending.type]: (state: ComponentsStateType) => {
      state.loading = true
    },
    [loadPageData.fulfilled.type]: (state: ComponentsStateType, action: PayloadAction) => {
      const {
        title = '',
        desc = '',
        js = '',
        css = '',
        isPublished = false,
        componentList = []
      } = action.payload as any
      state.loading = false
      state.componentList = componentList
      resetPageInfo({ title, desc, js, css, isPublished })
    },
    [loadPageData.rejected.type]: (state: ComponentsStateType) => {
      state.loading = false
      state.componentList = []
    }
  }
})

export const { changeSelectedId } = componentsSlice.actions
