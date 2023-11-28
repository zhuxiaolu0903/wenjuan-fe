import useGetLoginInfo from './useGetLoginInfo'
import { HOME_PATHNAME, isHomePage, isNoNeedLogin, MANAGE_LIST_PATHNAME } from '../router'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useNavPage = () => {
  const { token } = useGetLoginInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (token) {
      // 当前是首页，需要跳转到问卷列表页
      if (isHomePage(pathname)) {
        nav(MANAGE_LIST_PATHNAME)
      }
      return
    } else {
      // 当前是不需要登录的页面
      if (isNoNeedLogin(pathname)) return
      nav(HOME_PATHNAME)
    }
  }, [pathname])
}

export default useNavPage
