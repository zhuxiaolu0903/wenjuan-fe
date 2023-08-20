import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Button, Divider, Empty, Space } from 'antd'
import { SearchOutlined, SwapRightOutlined } from '@ant-design/icons'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '2023/06/28'
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 2,
    createdAt: '2023/06/28'
  }
]

const Star: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)
  useTitle('问卷星球—星标问卷')

  return (
    <div className={styles['question-list-container']}>
      <div className={styles['header']}>
        <div className={styles['title']}>星标问卷</div>
        <div className={styles['search']}>
          <Space style={{ cursor: 'pointer' }}>
            <SearchOutlined />
            搜索
          </Space>
        </div>
      </div>
      <div className={styles['center']}>
        {questionList.length === 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
            description={<span>您还没有问卷，请前往创建您的第一份问卷</span>}
          >
            <Button type="primary" icon={<SwapRightOutlined />}>
              立即前往
            </Button>
          </Empty>
        ) : (
          questionList.map((item, index) => (
            <div key={item._id}>
              <QuestionCard {...item} />
              {index !== questionList.length - 1 && <Divider style={{ margin: '16px 0 8px 0' }} />}
            </div>
          ))
        )}
      </div>
      <div className={styles['footer']}>分页</div>
    </div>
  )
}

export default Star
