import React, { FC } from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST_PATHNAME } from '../router'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" on-click={() => nav(MANAGE_LIST_PATHNAME)}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
