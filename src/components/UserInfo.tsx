import React, { FC, useState } from 'react'
import styles from './UserInfo.module.scss'
import { Button, Form, Input, message, Modal, Checkbox, Spin, Space } from 'antd'
import LogoImg from '../assets/images/logo.png'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'
import { deleteUserFromStorage, getUserInfoFromStorage, rememberUser } from '../utils/user-account'
import { signIn, onLogout } from '../redux/user/slice'
import { useAppDispatch } from '../redux/hooks'
import useGetLoginInfo from '../hooks/useGetLoginInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons'

const UserInfo: FC = () => {
  const [tab, setTab] = useState('login')
  const [showLogin, setShowLogin] = useState(false)
  const [form] = Form.useForm()
  const { submitLoading, token } = useGetLoginInfo()
  const dispatch = useAppDispatch()

  // 获取用户数据
  const { loading, nickname } = useLoadUserData(token)

  const handleOpenLoginModal = () => {
    setTab('login')
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
    setShowLogin(true)
  }

  const handleCancelLogin = () => {
    setShowLogin(false)
  }

  const { run: register } = useRequest(
    async (username, password, nickname) => {
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功')
        setTab('login')
      }
    }
  )

  const onFinish = (values) => {
    const { username, password, remember, nickname } = values
    if (tab === 'login') {
      dispatch(signIn({ username, password }))
      if (remember) {
        rememberUser(username, password)
      } else {
        deleteUserFromStorage()
      }
    } else {
      register(username, password, nickname)
    }
  }

  // 登录表单
  const loginForm = (
    <div className={styles['slide-tab-item']}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
            { pattern: /^\w+$/, message: '只能是字母数字下划线' }
          ]}
        >
          <Input placeholder={'请输入用户名'} />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder={'请输入密码'} />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
          <Checkbox>下次免密登录</Checkbox>
        </Form.Item>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>
          首次使用？<a onClick={() => setTab('register')}>点我注册</a>
        </p>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={submitLoading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )

  // 注册表单
  const registerForm = (
    <div className={styles['slide-tab-item']}>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
            { pattern: /^\w+$/, message: '只能是字母数字下划线' }
          ]}
        >
          <Input placeholder={'请输入用户名'} />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder={'请输入密码'} />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm"
          dependencies={['password']} // 依赖于 password ，password 变化，会重新触发 validator
          rules={[
            { required: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('两次密码不一致'))
                }
              }
            })
          ]}
        >
          <Input.Password placeholder={'请再次输入密码'} />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input placeholder={'请输入昵称'} />
        </Form.Item>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>
          已有账号？<a onClick={() => setTab('login')}>点我登录</a>
        </p>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )

  // 退出
  const logout = () => {
    Modal.confirm({
      title: '确认退出',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录？',
      onOk: () => {
        dispatch(onLogout())
      }
    })
  }
  return (
    <div className={styles['container']}>
      {submitLoading || loading ? (
        <Spin />
      ) : nickname ? (
        <Space style={{ color: '#ffffff' }}>
          <span>欢迎回来，{nickname}</span>
          <LogoutOutlined onClick={logout} />
        </Space>
      ) : (
        <Button type={'text'} style={{ color: '#ffffff' }} onClick={handleOpenLoginModal}>
          登录
        </Button>
      )}
      <Modal centered footer={null} width={268} open={showLogin} onCancel={handleCancelLogin}>
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
