import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Space, Badge } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
  StockOutlined
} from '@ant-design/icons'

type PropsType = {
  id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props) => {
  const { id, title, isPublished, answerCount, createdAt } = props
  return (
    <>
      <Badge.Ribbon text={isPublished ? '已发布' : '未发布'}>
        <div className={styles['container']}>
          <div className={styles['title']}>
            <div className={styles['left']}>
              <a href="#">{title}</a>
            </div>
            <div className={styles['right']}>
              <Space>
                <span>答卷：{answerCount}</span>
                <span>{createdAt}</span>
              </Space>
            </div>
          </div>
          <div className={styles['button-container']}>
            <div className={styles['left']}>
              {/*<Button icon={<EditOutlined />} type="text" size="small">编辑</Button>*/}
              <Space>
                <Space style={{ cursor: 'pointer' }}>
                  <EditOutlined style={{ fontSize: '12px' }} />
                  <span>编辑</span>
                </Space>
                <Space style={{ cursor: 'pointer' }}>
                  <StockOutlined style={{ fontSize: '12px' }} />
                  <span>数据统计</span>
                </Space>
              </Space>
            </div>
            <div className={styles['right']}>
              <Space>
                <Space style={{ cursor: 'pointer' }}>
                  <StarOutlined style={{ fontSize: '12px' }} />
                  <span>标星</span>
                </Space>
                <Space style={{ cursor: 'pointer' }}>
                  <CopyOutlined style={{ fontSize: '12px' }} />
                  <span>复制</span>
                </Space>
                <Space style={{ cursor: 'pointer' }}>
                  <DeleteOutlined style={{ fontSize: '12px' }} />
                  <span>删除</span>
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </Badge.Ribbon>
    </>
  )
}

export default QuestionCard
