import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
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
  getItem('问卷管理', 'questionManage', <MailOutlined />, [
    getItem('我的问卷', 'my', <MailOutlined />),
    getItem('星标问卷', 'star', <MailOutlined />)
  ]),
  { type: 'divider' },
  getItem('快捷访问', 'quick', null, [getItem('回收站', 'trash', <MailOutlined />)], 'group')
]

const ManageLayout: FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  return (
    <Layout className={styles['container']}>
      <Sider className={styles['left']}>
        {
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        }
      </Sider>
      <Content className={styles['right']}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default ManageLayout
