import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './Main.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles['head-container']}>
        <div>
          <Logo />
        </div>
        <div>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles['main']}>
        <Outlet />
      </Content>
      <Footer className={styles['footer-container']}>
        小慕问卷@2023 - present. Created by lucy
      </Footer>
    </Layout>
  )
}

export default MainLayout
