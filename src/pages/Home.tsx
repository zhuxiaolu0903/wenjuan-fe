import React, { FC } from 'react'
import { Typography, Button, Carousel, message } from 'antd'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST_PATHNAME } from '../router'
import useGetLoginInfo from '../hooks/useGetLoginInfo'

const { Title, Paragraph } = Typography
const Home: FC = () => {
  const nav = useNavigate()
  const { token } = useGetLoginInfo()
  const startUse = () => {
    if (token) nav(MANAGE_LIST_PATHNAME)
    else message.info('请先登录')
  }
  return (
    <Carousel effect="fade" autoplay>
      <div className={styles['container-1']}>
        <div className={styles['info']}>
          <Title>问卷调查 | 在线投票</Title>
          <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
          <div>
            <Button type="primary" onClick={startUse}>
              开始使用
            </Button>
          </div>
        </div>
      </div>
      <div className={styles['container-2']}>
        <div className={styles['info']}>
          <Title>问卷调查 | 在线投票</Title>
          <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
          <div>
            <Button type="primary" onClick={startUse}>
              开始使用
            </Button>
          </div>
        </div>
      </div>
    </Carousel>
  )
}

export default Home
