import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ManageLayout: FC = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Outlet />
    </div>
  )
}

export default ManageLayout
