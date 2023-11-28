import React, { FC, useEffect } from 'react'
import styles from './index.module.scss'
import { EditHeader } from './EditHeader'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { EditCanvas } from './EchartCanvas'
import { loadPageData } from '../../../redux/components/slice'
import { useAppDispatch } from '../../../redux/hooks'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id = '' } = useParams()
  if (!id) throw new Error('没有问卷 id')

  const dispatch = useAppDispatch()
  useEffect(() => {
    // 加载文件详情
    dispatch(loadPageData(id))
  }, [])
  return (
    <>
      <div className={styles['header']}>
        <EditHeader />
      </div>
      <div className={styles['container']}>
        <div className={styles['left']}>
          <LeftPanel />
        </div>
        <div className={styles['center']}>
          <div className={styles['canvas-wrapper']}>
            <EditCanvas />
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
