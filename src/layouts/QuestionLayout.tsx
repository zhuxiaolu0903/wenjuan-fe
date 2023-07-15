import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ManageLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout</div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default ManageLayout
