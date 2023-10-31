import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'

function App() {
  return (
    <ConfigProvider
      locale={zh_CN}
      theme={{
        token: {
          fontFamily: '仓耳渔阳体 W01',
          colorPrimary: '#07c160',
          borderRadius: 2
        }
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
