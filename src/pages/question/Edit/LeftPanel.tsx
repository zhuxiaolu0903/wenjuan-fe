import React, { FC } from 'react'
import ComponentLib from './ComponentLib'
import { Tabs, TabsProps } from 'antd'

const LeftPanel: FC = () => {
  const items: TabsProps['items'] = [
    {
      key: 'componentLib',
      label: '组件',
      children: <ComponentLib />
    },
    {
      key: 'layers',
      label: '图层',
      children: 'Content of Tab Pane 2'
    }
  ]
  return (
    <Tabs
      defaultActiveKey={'componentLib'}
      items={items}
      size={'small'}
      indicatorSize={(origin) => origin + 16}
    />
  )
}

export default LeftPanel
