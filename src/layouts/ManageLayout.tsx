import React, { FC, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button } from 'antd'
import type { MenuProps } from 'antd'

const { Sider, Content } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('问卷管理', 'questionManage', <AppstoreOutlined />, [
    getItem('我的问卷', 'my', <UnorderedListOutlined />),
    getItem('星标问卷', 'star', <StarOutlined />)
  ]),
  { type: 'divider' },
  getItem('快捷访问', 'quick', null, [getItem('回收站', 'trash', <DeleteOutlined />)], 'group')
]

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    let path = ''
    switch (e.key) {
      case 'my':
        path = '/manage/list'
        break
      case 'star':
        path = '/manage/star'
        break
      case 'trash':
        path = '/manage/trash'
        break
    }
    nav(path)
  }

  return (
    <Layout className={styles['container']}>
      <Sider className={styles['left']}>
        {
          <div>
            <div className={styles['create-question-container']}>
              <Button type="primary" block icon={<PlusOutlined />} size="large">
                创建问卷
              </Button>
            </div>
            <Menu
              onClick={onClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
          </div>
        }
      </Sider>
      <Content className={styles['right']}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default ManageLayout
