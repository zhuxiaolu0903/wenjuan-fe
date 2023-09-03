import React, { FC, useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
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
  getItem('问卷管理', 'manage', <AppstoreOutlined />, [
    getItem('我的问卷', '/manage/list', <UnorderedListOutlined />),
    getItem('星标问卷', '/manage/star', <StarOutlined />)
  ]),
  { type: 'divider' },
  getItem(
    '快捷访问',
    'quick',
    null,
    [getItem('回收站', '/manage/trash', <DeleteOutlined />)],
    'group'
  )
]

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  useEffect(() => {
    const keys = pathname.split('/')
    setOpenKeys([keys[1]])
  }, [pathname])

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
              onClick={(e) => {
                nav(e.key)
              }}
              selectedKeys={[pathname]}
              openKeys={openKeys}
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
