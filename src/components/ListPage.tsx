import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()

  // 监听路由改变
  useEffect(() => {
    // 修改当前分页信息
    setCurrent(parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || ''))
    setPageSize(parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE)
  }, [searchParams])

  const nav = useNavigate()
  const { pathname } = useLocation()
  const handlePageChange = (page: number, pageSize: number) => {
    // 修改当前路由参数
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    // 跳转到指定路由
    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  return (
    <Pagination
      showQuickJumper
      current={current}
      pageSize={pageSize}
      size={'small'}
      total={total}
      onChange={handlePageChange}
    />
  )
}

export default ListPage
