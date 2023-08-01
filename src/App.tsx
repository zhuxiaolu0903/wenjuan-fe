import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '仓耳渔阳体 W01'
        }
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
