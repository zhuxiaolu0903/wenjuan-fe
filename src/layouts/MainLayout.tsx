import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './Main.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useNavPage from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  // 根据登录状态导航页面
  useNavPage()
  return (
    <Layout>
      <Header className={styles['head-container']}>
        <Logo />
        <UserInfo />
      </Header>
      <Content className={styles['main']}>
        <Outlet />
      </Content>
      <Footer className={styles['footer-container']}>
        问卷星球@2023 - present. Created by lucy
      </Footer>
    </Layout>
  )
}

export default MainLayout
