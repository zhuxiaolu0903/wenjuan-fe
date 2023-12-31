import React, { FC, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import EditHeader from './EditHeader'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditCanvas from './EchartCanvas'
import EditFooter from './EditFooter'
import { changeSelectedId, loadPageData } from '../../../redux/components/slice'
import { useAppDispatch } from '../../../redux/hooks'
import { useParams } from 'react-router-dom'
import { useSize } from 'ahooks'

const Edit: FC = () => {
  const { id = '' } = useParams()
  if (!id) throw new Error('没有问卷 id')
  const containerRef = useRef(null)

  // 动态设置问卷高度
  const canvasSize = (useSize(containerRef)?.height || 712) - 24

  const dispatch = useAppDispatch()
  useEffect(() => {
    // 加载文件详情
    dispatch(loadPageData(id))
  }, [])

  // 清空当前选中组件
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <>
      <div className={styles['header']}>
        <EditHeader />
      </div>
      <div className={styles['container']}>
        <div className={styles['left']}>
          <LeftPanel />
        </div>
        <div className={styles['center']} onClick={clearSelectedId}>
          <div className={styles['canvas-wrapper']} ref={containerRef}>
            <div className={styles['canvas-container']} style={{ height: canvasSize + 'px' }}>
              <EditCanvas />
            </div>
          </div>
          <div className={styles['footer']}>
            <EditFooter />
          </div>
        </div>
        <div className={styles['right']}>
          <RightPanel />
        </div>
      </div>
    </>
  )
}

export default Edit
