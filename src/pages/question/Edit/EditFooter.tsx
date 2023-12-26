import React, { FC, useState } from 'react'
import { Button, Divider, Drawer, Flex, Space, Typography } from 'antd'
import { MacCommandOutlined } from '@ant-design/icons'

const footerStyle: React.CSSProperties = {
  fontSize: 12
}
const textStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '80px',
  textAlign: 'right'
}

const { Title, Text } = Typography
const EditFooter: FC = () => {
  const [open, setOpen] = useState(false)
  const showShortCurModel = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Flex style={footerStyle} justify="space-between" align="center">
        <Space>
          <Button
            icon={<MacCommandOutlined />}
            type="text"
            size="small"
            onClick={showShortCurModel}
          >
            快捷键
          </Button>
        </Space>
      </Flex>
      <Drawer title="快捷键说明" placement="right" onClose={onClose} open={open}>
        <Space direction="vertical" size="large">
          <Title level={4} style={{ margin: 0 }}>
            控件快捷键
          </Title>
          <Space>
            <span style={textStyle}>选择：</span>
            <Text strong>鼠标左键</Text>
          </Space>
          <Space>
            <span style={textStyle}>添加：</span>
            <Text strong>鼠标左键</Text>
          </Space>
          <Space>
            <span style={textStyle}>操作：</span>
            <Text>鼠标右键</Text>
          </Space>
          <Space>
            <span style={textStyle}>切换：</span>
            <Text keyboard>↑</Text>
            <Text keyboard>↓</Text>
          </Space>
          <Space>
            <span style={textStyle}>移动：</span>
            <Text keyboard>Ctrl/Command</Text>
            <Text>+</Text>
            <Text keyboard>↑</Text>
            <Text keyboard>↓</Text>
          </Space>
        </Space>
        <Divider />
        <Space direction="vertical" size="large">
          <Title level={4} style={{ margin: 0 }}>
            画布快捷键
          </Title>
          <Space>
            <span style={textStyle}>选择：</span>
            <Text strong>鼠标左键</Text>
          </Space>
          <Space>
            <span style={textStyle}>添加：</span>
            <Text strong>鼠标左键</Text>
          </Space>
          <Space>
            <span style={textStyle}>操作：</span>
            <Text>鼠标右键</Text>
          </Space>
          <Space>
            <span style={textStyle}>切换：</span>
            <Text keyboard>↑</Text>
            <Text keyboard>↓</Text>
          </Space>
          <Space>
            <span style={textStyle}>移动：</span>
            <Text keyboard>Ctrl/Command</Text>
            <Text>+</Text>
            <Text keyboard>↑</Text>
            <Text keyboard>↓</Text>
          </Space>
        </Space>
      </Drawer>
    </>
  )
}

export default EditFooter
