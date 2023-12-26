import { useKeyPress } from 'ahooks'
import {
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
  toggleComponentHidden,
  toggleComponentLocked
} from '../redux/components/slice'
import { useAppDispatch } from '../redux/hooks'

/**
 * 判断 activeElem 是否合法
 */
const isActiveElementValid = () => {
  const activeElem = document.activeElement
  return activeElem === document.body
}
const useBindCanvasKeyPress = (curOptFeId: string) => {
  const dispatch = useAppDispatch()
  // 删除
  useKeyPress(['Delete', 'Backspace'], () => {
    if (!isActiveElementValid() || !curOptFeId) return
    dispatch(removeSelectedComponent(curOptFeId))
  })
  // 显示/隐藏
  useKeyPress('ctrl.h', (e) => {
    if (!isActiveElementValid()) return
    e.preventDefault()
    dispatch(toggleComponentHidden(curOptFeId))
  })
  // 锁定/解锁
  useKeyPress('ctrl.l', (e) => {
    if (!isActiveElementValid()) return
    e.preventDefault()
    dispatch(toggleComponentLocked(curOptFeId))
  })
  // 选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  // 选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
