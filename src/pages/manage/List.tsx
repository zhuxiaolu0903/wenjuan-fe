import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'
import { useTitle } from 'ahooks'

const rawQuestionList = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '2023/06/28'
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 2,
    createdAt: '2023/06/28'
  }
]

const List: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)
  useTitle('问卷星球—我的问卷')

  return (
    <>
      <div className={styles['header']}>
        <div className={styles['title']}>我的问卷</div>
        <div className={styles['search']}>搜索</div>
      </div>
      <div className={styles['center']}>
        {questionList.map((item) => (
          <QuestionCard key={item.id} {...item} />
        ))}
      </div>
      <div className={styles['footer']}></div>
    </>
  )
}

export default List
