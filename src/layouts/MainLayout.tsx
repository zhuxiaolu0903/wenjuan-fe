import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './Main.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header>MainLayout header</Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer>MainLayout footer</Footer>
    </Layout>
  )
}

export default MainLayout
