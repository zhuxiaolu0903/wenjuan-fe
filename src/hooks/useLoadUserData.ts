import { getUserInfoService } from '../services/user'
import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'

const useLoadUserData = (token) => {
  const [loading, setLoading] = useState(false)
  const [nickname, setNickname] = useState('')

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      // 获取用户数据
      setNickname(result.nickname)
    },
    onFinally() {
      setLoading(false)
    }
  })
  // 监听token
  useEffect(() => {
    // 查询用户信息
    if (token) {
      setLoading(true)
      run()
    }
  }, [token])

  return { loading, nickname }
}

export default useLoadUserData
