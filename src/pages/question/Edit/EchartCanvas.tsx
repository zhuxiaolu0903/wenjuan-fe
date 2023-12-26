import React, { FC, MouseEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  changeSelectedId,
  ComponentInfoType,
  removeSelectedComponent,
  toggleComponentHidden,
  toggleComponentLocked
} from '../../../redux/components/slice'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import styles from './EditCanavs.module.scss'
import classnames from 'classnames'
import noComponentIcon from '../../../assets/images/no-component.png'
import { Spin, Space, Dropdown, MenuProps } from 'antd'
import 'react-contexify/ReactContexify.css'
import { LockOutlined } from '@ant-design/icons'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）

  // 根据类型在组件列表中查询组件
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC = () => {
  const [curOptFeId, setCurOptFeId] = useState<string>()
  const loading = useAppSelector((state) => state.components.loading)
  const selectedId = useAppSelector((state) => state.components.selectedId)
  const componentList = useAppSelector((state) => state.components.componentList)
  const dispatch = useAppDispatch()
  // 绑定快捷键
  useBindCanvasKeyPress(selectedId)
  const handleClick = (event: MouseEvent, fe_id: string, isLocked = false) => {
    event.stopPropagation()
    if (isLocked) return
    dispatch(changeSelectedId(fe_id))
  }
  // 右击选中组件
  const handleContextMenu = (event: MouseEvent, fe_id: string, isLocked = false) => {
    if (isLocked) {
      // 被锁定状态下不允许右击
      event.stopPropagation()
      event.preventDefault()
      return false
    }
    setCurOptFeId(fe_id)
    dispatch(changeSelectedId(fe_id))
  }
  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: (
        <div className={styles['option-item-box']}>
          <span>删除</span>
          <span>Delete / Backspace </span>
        </div>
      )
    },
    {
      key: 'hide',
      label: (
        <div className={styles['option-item-box']}>
          <span>显示/隐藏</span>
          <span>Ctrl + H</span>
        </div>
      )
    },
    {
      key: 'lock',
      label: (
        <div className={styles['option-item-box']}>
          <span>锁定/解锁</span>
          <span>Ctrl + L</span>
        </div>
      )
    },
    {
      type: 'divider'
    },
    {
      key: 'upLayer',
      label: (
        <div className={styles['option-item-box']}>
          <span>向上移动</span>
          <span>Ctrl + ↑</span>
        </div>
      )
    },
    {
      key: 'downLayer',
      label: (
        <div className={styles['option-item-box']}>
          <span>向下移动</span>
          <span>Ctrl + ↓</span>
        </div>
      )
    }
  ]
  const handleClickMenuItem: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation()
    if (curOptFeId) {
      switch (e.key) {
        case 'delete':
          dispatch(removeSelectedComponent(curOptFeId))
          break
        case 'hide':
          dispatch(toggleComponentHidden(curOptFeId))
          break
        case 'lock':
          dispatch(toggleComponentLocked(curOptFeId))
          break
      }
    }
  }
  return (
    <div className={styles['canvas-container']}>
      {loading ? (
        <div className={styles['spin-container']}>
          <Space direction="vertical" align="center">
            <Spin />
            <span style={{ fontSize: '12px' }}>加载中...</span>
          </Space>
        </div>
      ) : componentList.length === 0 ? (
        <div className={styles['no-data-container']}>
          <img src={noComponentIcon} alt="暂无组件" />
          <span className={styles['no-data-title']}>暂无组件</span>
          <span className={styles['no-data-info']}>点击左侧组件放置此处</span>
        </div>
      ) : (
        <Dropdown
          menu={{ items, onClick: (e) => handleClickMenuItem(e) }}
          trigger={['contextMenu']}
        >
          <div>
            {componentList
              .filter((component) => !component.isHidden)
              .map((component) => {
                const { fe_id, isLocked } = component
                // 使用classnames插件拼接className
                const wrapperClassName = classnames({
                  [styles['component-item']]: true,
                  [styles['selected']]: fe_id === selectedId,
                  [styles['locked']]: isLocked
                })
                return (
                  <div
                    key={fe_id}
                    onClick={(e) => handleClick(e, fe_id, isLocked)}
                    onContextMenu={(e) => handleContextMenu(e, fe_id, isLocked)}
                    className={wrapperClassName}
                  >
                    {isLocked && (
                      <div className={styles['locked-icon']}>
                        <LockOutlined />
                      </div>
                    )}
                    <div className={styles['component']}>{genComponent(component)}</div>
                  </div>
                )
              })}
          </div>
        </Dropdown>
      )}
    </div>
  )
}

export default EditCanvas
