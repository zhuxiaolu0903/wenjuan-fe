import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getQuestionService } from '../../services/question'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { resetPageInfo } from '../pageInfo/slice'
import { getNextSelectedId, insertNewComponent } from './utils'

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
    },
    // 新增组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      if (newComponent) {
        insertNewComponent(state, newComponent)
      }
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      const curComp = state.componentList.find((component) => component.fe_id === fe_id)
      if (!curComp) return
      curComp.props = {
        ...curComp.props,
        ...newProps
      }
    },
    // 显示/隐藏组件
    toggleComponentHidden(state: ComponentsStateType, action: PayloadAction<string>) {
      const { componentList = [] } = state
      const fe_id = action.payload
      // 重新计算selectedId
      state.selectedId = getNextSelectedId(fe_id, componentList)
      const curComp = componentList.find((component) => component.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = !curComp.isHidden
      }
    },
    // 锁定/解锁组件
    toggleComponentLocked(state: ComponentsStateType, action: PayloadAction<string>) {
      const { componentList = [] } = state
      const fe_id = action.payload
      // 重新计算selectedId
      state.selectedId = getNextSelectedId(fe_id, componentList)
      const curComp = componentList.find((component) => component.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
    // 选中上一个组件
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const filterComponentList = componentList.filter(
        (component) => !component.isHidden && !component.isLocked
      )
      let selectedIndex = filterComponentList.findIndex((c) => c.fe_id === selectedId)
      // 未选中组件
      if (selectedIndex === -1) return
      if (selectedIndex === 0) selectedIndex = filterComponentList.length
      state.selectedId = filterComponentList[selectedIndex - 1].fe_id
    },
    // 选中下一个组件
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const filterComponentList = componentList.filter(
        (component) => !component.isHidden && !component.isLocked
      )
      let selectedIndex = filterComponentList.findIndex((c) => c.fe_id === selectedId)
      // 未选中组件
      if (selectedIndex === -1) return
      if (selectedIndex === filterComponentList.length - 1) selectedIndex = -1
      state.selectedId = filterComponentList[selectedIndex + 1].fe_id
    },
    // 删除当前选中的组件
    removeSelectedComponent: (state: ComponentsStateType, action: PayloadAction<string>) => {
      const { componentList = [] } = state
      const removedId = action.payload
      // 重新计算selectedId
      state.selectedId = getNextSelectedId(removedId, componentList)
      const index = componentList.findIndex((component) => component.fe_id === removedId)
      state.componentList.splice(index, 1)
    },
    // 清空组件
    clearComponent(state: ComponentsStateType) {
      state.selectedId = ''
      state.componentList = []
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

export const {
  changeSelectedId,
  addComponent,
  changeComponentProps,
  toggleComponentHidden,
  toggleComponentLocked,
  selectPrevComponent,
  selectNextComponent,
  removeSelectedComponent,
  clearComponent
} = componentsSlice.actions
