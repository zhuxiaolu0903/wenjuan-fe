import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const ListSearch: FC = () => {
  const { Search } = Input
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')

  useEffect(() => {
    const searchValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(searchValue)
  }, [searchParams])
  const onSearch = (value: string) => {
    // 跳转到当前页面，并携带参数
    nav({
      pathname,
      search: value !== '' ? `${LIST_SEARCH_PARAM_KEY}=${value}` : ''
    })
  }

  // 受控组件赋值
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <>
      <Search
        placeholder="请输入关键字"
        allowClear
        style={{ width: 200 }}
        onSearch={onSearch}
        onChange={onChange}
        value={value}
      />
    </>
  )
}
export default ListSearch
