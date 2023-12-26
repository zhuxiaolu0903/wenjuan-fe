import { useKeyPress } from 'ahooks'
import {
  removeSelectedComponent,
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
const useBindCanvasKeyPress = (curOptFeId) => {
  const dispatch = useAppDispatch()
  // 删除
  useKeyPress(['Delete', 'Backspace'], () => {
    if (!isActiveElementValid()) return
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
}

export default useBindCanvasKeyPress
