import React, { FC, useEffect, useState } from 'react'
import ComponentProp from './ComponentProp'
import { Tabs, TabsProps } from 'antd'
import { useAppSelector } from '../../../redux/hooks'

const RightPanel: FC = () => {
  const { selectedId } = useAppSelector((state) => state.components)
  const [items, setItems] = useState<TabsProps['items']>([
    {
      key: 'setting',
      label: '页面设置',
      children: 'Content of Tab Pane 2'
    }
  ])
  const [activeKey, setActiveKey] = useState<string>('setting')
  // 判断当前是否已选中组件，动态增删属性tab
  useEffect(() => {
    if (selectedId) {
      setItems([
        {
          key: 'setting',
          label: '页面设置',
          children: 'Content of Tab Pane 2'
        },
        {
          key: 'componentProp',
          label: '属性',
          children: <ComponentProp />
        }
      ])
      setActiveKey('componentProp')
    } else {
      setItems([
        {
          key: 'setting',
          label: '页面设置',
          children: 'Content of Tab Pane 2'
        }
      ])
      setActiveKey('setting')
    }
  }, [selectedId])
  const changeTab = (activeKey: string) => {
    setActiveKey(activeKey)
  }
  return (
    <Tabs
      activeKey={activeKey}
      items={items}
      size={'small'}
      indicatorSize={(origin) => origin + 16}
      onChange={changeTab}
    />
  )
}

export default RightPanel
