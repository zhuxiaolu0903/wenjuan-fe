import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Space, Badge, Divider, Tag, Button, Tooltip, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
  StarFilled,
  StockOutlined
} from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props
  const onCopy = () => {
    message.success('复制成功!')
  }
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['title']}>
          <div className={styles['left']}>
            <Space>
              <a href="#">{title}</a>
              <Tag color={isPublished ? 'green' : 'default'} bordered={false}>
                {isPublished ? '已发布' : '未发布'}
              </Tag>
            </Space>
          </div>
          <div className={styles['right']}>
            {isStar ? (
              <Tooltip title="取消标星">
                <StarFilled style={{ color: '#fecd44', cursor: 'pointer', fontSize: '18px' }} />
              </Tooltip>
            ) : (
              <Tooltip title="标星">
                <StarOutlined style={{ color: '#fecd44', cursor: 'pointer', fontSize: '18px' }} />
              </Tooltip>
            )}
          </div>
        </div>
        <div className={styles['question-info']}>
          <span>创建时间：{createdAt}</span>
          <span>
            答卷：<span className={styles['number']}>{answerCount}</span>
          </span>
        </div>
        <div className={styles['button-container']}>
          <div className={styles['left']}>
            <Space>
              <Space style={{ cursor: 'pointer' }}>
                <EditOutlined style={{ fontSize: '12px' }} />
                <span>编辑</span>
              </Space>
              <Divider type="vertical" />
              <Space
                style={{ cursor: 'pointer' }}
                className={isPublished ? '' : styles['disabled']}
              >
                <StockOutlined style={{ fontSize: '12px' }} />
                <span>数据统计</span>
              </Space>
            </Space>
          </div>
          <div className={styles['right']}>
            <Space>
              <Space style={{ cursor: 'pointer' }} onClick={() => onCopy()}>
                <CopyOutlined style={{ fontSize: '12px' }} />
                <span>复制</span>
              </Space>
              <Divider type="vertical" />
              <Space style={{ cursor: 'pointer' }}>
                <DeleteOutlined style={{ fontSize: '12px' }} />
                <span>删除</span>
              </Space>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard
