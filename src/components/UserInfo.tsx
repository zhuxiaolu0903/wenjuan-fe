import React, { FC, useState } from 'react'
import styles from './UserInfo.module.scss'
import { Button, Form, Input, Modal } from 'antd'
import LogoImg from '../assets/images/logo.png'

const UserInfo: FC = () => {
  const [tab, setTab] = useState('login')
  const [showLogin, setShowLogin] = useState(false)

  const handleOpenLoginModal = () => {
    setShowLogin(true)
  }

  const handleLogin = () => {
    setShowLogin(false)
  }
  const handleCancelLogin = () => {
    setShowLogin(false)
  }

  const loginForm = (
    <div className={styles['slide-tab-item']}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>
          首次使用？<a onClick={() => setTab('register')}>点我注册</a>
        </p>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )

  const registerForm = (
    <div className={styles['slide-tab-item']}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>
          已有账号？<a onClick={() => setTab('login')}>点我登录</a>
        </p>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
  return (
    <div className={styles['container']}>
      <Button type={'text'} style={{ color: '#ffffff' }} onClick={handleOpenLoginModal}>
        登录
      </Button>
      <Modal
        centered
        footer={null}
        width={268}
        open={showLogin}
        onOk={handleLogin}
        onCancel={handleCancelLogin}
      >
        <div className={styles['sign-in-container']}>
          <div className={styles['title']}>
            <img src={LogoImg} alt="logo" />
            <span>问卷星球</span>
          </div>
          <div className="slide-tab">{tab === 'login' ? loginForm : registerForm}</div>
        </div>
      </Modal>
    </div>
  )
}
export default UserInfo
