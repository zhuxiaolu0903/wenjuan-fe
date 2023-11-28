import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeSelectedId, ComponentInfoType } from '../../../redux/components/slice'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import styles from './EditCanavs.module.scss'
import classnames from 'classnames'
import noComponentIcon from '../../../assets/images/no-component.png'

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）

  // 根据类型在组件列表中查询组件
  const componentConf = getComponentConfByType(type)
  console.log(type, componentConf)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} />
}

export const EditCanvas: FC = () => {
  const loading = useAppSelector((state) => state.components.loading)
  const selectedId = useAppSelector((state) => state.components.selectedId)
  const componentList = useAppSelector((state) => state.components.componentList)
  const dispatch = useAppDispatch()
  const handleClick = (fe_id: string) => {
    dispatch(changeSelectedId(fe_id))
  }
  return (
    <div className={styles['canvas-container']}>
      {componentList.length === 0 ? (
        <div className={styles['no-data-container']}>
          <img src={noComponentIcon} alt="暂无组件" />
          <span className={styles['no-data-title']}>暂无组件</span>
          <span className={styles['no-data-info']}>拖拽左侧组件放置此处</span>
        </div>
      ) : (
        componentList.map((component) => {
          const { fe_id } = component
          // 使用classnames插件拼接className
          const wrapperClassName = classnames({
            [styles['component-item']]: true,
            [styles['selected']]: fe_id === selectedId
          })
          return (
            <div key={fe_id} onClick={() => handleClick(fe_id)} className={wrapperClassName}>
              <div className={styles['component']}>{genComponent(component)}</div>
            </div>
          )
        })
      )}
    </div>
  )
}
