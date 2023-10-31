import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Space, Divider, Tag, Tooltip, message, Popconfirm, Modal } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
  StarFilled,
  StockOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
  isLast?: boolean // 是否是最后一条
  isStarPage?: boolean // 是否是星标页面
  onRefresh: () => void // 刷新函数
}

const QuestionCard: FC<PropsType> = (props) => {
  const {
    isLast = false,
    isStarPage = false,
    onRefresh,
    _id,
    title,
    isPublished,
    isStar,
    answerCount,
    createdAt
  } = props

  const nav = useNavigate()

  // 复制
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess: ({ id }) => {
        message.success('复制成功')
        // 跳转到问卷编辑页
        nav(`/question/edit/${id}`)
      }
    }
  )

  // 删除
  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    async () =>
      await updateQuestionService(_id, {
        isDeleted: true
      }),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        // 重新执行一次查询
        onRefresh()
      }
    }
  )

  const { confirm } = Modal
  // 删除
  const del = () => {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion
    })
  }

  // 标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () =>
      await updateQuestionService(_id, {
        isStar: !isStarState
      }),
    {
      manual: true,
      onSuccess: () => {
        message.success('操作成功')
        if (isStarPage) {
          // 星标页需要刷新列表，让取消标星的数据消失
          onRefresh()
        } else {
          setIsStarState(!isStarState)
        }
      }
    }
  )

  return (
    <>
      <div>
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
              {isStarState ? (
                <Tooltip title="取消标星">
                  <StarFilled
                    style={{ color: '#fecd44', cursor: 'pointer', fontSize: '18px' }}
                    className={!changeStarLoading ? '' : styles['disabled']}
                    onClick={changeStar}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="标星">
                  <StarOutlined
                    style={{ color: '#fecd44', cursor: 'pointer', fontSize: '18px' }}
                    className={!changeStarLoading ? '' : styles['disabled']}
                    onClick={changeStar}
                  />
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
                <Space style={{ cursor: 'pointer' }} onClick={() => nav(`/question/edit/${_id}`)}>
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
                <Popconfirm
                  title="确定复制该问卷？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={duplicate}
                >
                  <Space
                    style={{ cursor: 'pointer' }}
                    className={!duplicateLoading ? '' : styles['disabled']}
                  >
                    <CopyOutlined style={{ fontSize: '12px' }} />
                    <span>复制</span>
                  </Space>
                </Popconfirm>
                <Divider type="vertical" />
                <Space
                  style={{ cursor: 'pointer' }}
                  onClick={del}
                  className={!deleteLoading ? '' : styles['disabled']}
                >
                  <DeleteOutlined style={{ fontSize: '12px' }} />
                  <span>删除</span>
                </Space>
              </Space>
            </div>
          </div>
        </div>
        {!isLast && <Divider style={{ margin: '16px 0 8px 0' }} />}
      </div>
    </>
  )
}

export default QuestionCard
