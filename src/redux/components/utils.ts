import type { ComponentsStateType, ComponentInfoType } from './slice'

/**
 * 插入新组件
 * @param state redux state
 * @param newComponent 新组件
 */
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = selectedId
    ? componentList.findIndex((component) => component.fe_id === selectedId)
    : -1
  // 将新组件插入到当前选中组件的下方，否则放置到末尾
  if (index > -1) {
    state.componentList.splice(index + 1, 0, newComponent)
  } else {
    state.componentList.push(newComponent)
  }
  state.selectedId = newComponent.fe_id
}

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const filterComponentList = componentList.filter((component) => !component.isHidden)
  let newSelectedId = ''
  const index = filterComponentList.findIndex((component) => component.fe_id === fe_id)
  if (index > -1) {
    const len = filterComponentList.length
    // 组件个数大于1
    if (len > 1) {
      // 当前的是最后一个组件
      if (index + 1 === len) {
        // 要删除最后一个，就要选中上一个
        newSelectedId = filterComponentList[index - 1].fe_id
      } else {
        // 要删除的不是最后一个，删除以后，选中下一个
        newSelectedId = filterComponentList[index + 1].fe_id
      }
    }
  }
  return newSelectedId
}
