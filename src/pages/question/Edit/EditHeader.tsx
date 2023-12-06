import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { Space, Button, Tooltip, Modal } from 'antd'
import ClearImg from '../../../assets/images/edit/clear.png'
import { ExclamationCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { clearComponent } from '../../../redux/components/slice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

const EditHeader: FC = () => {
  const componentList = useAppSelector((state) => state.components.componentList)
  const dispatch = useAppDispatch()
  const handleClearCanvas = () => {
    if (componentList.length > 0) {
      Modal.confirm({
        title: '确认清空',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认清空画布？',
        onOk: () => {
          dispatch(clearComponent())
        }
      })
    }
  }
  return (
    <>
      <div className={styles['left']}>
        <Space>
          <LeftOutlined style={{ cursor: 'pointer' }} />
          <span>企业人力资源管理系统</span>
        </Space>
      </div>
      <div className={styles['center']}>
        <Space>
          <Tooltip title="清空画布">
            <img src={ClearImg} alt="" onClick={handleClearCanvas} />
          </Tooltip>
        </Space>
      </div>
      <div className={styles['right']}>
        <Space>
          <Button>发布</Button>
        </Space>
      </div>
    </>
  )
}

export default EditHeader
