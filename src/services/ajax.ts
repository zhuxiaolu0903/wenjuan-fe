import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10 * 1000
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer token}`
  return config
})

instance.interceptors.response.use((response) => {
  const resData = response.data as ResDataType
  const { errno, data, msg } = resData
  if (errno !== 0) {
    if (msg) {
      message.error(msg)
    }
  }
  return data
})

export default instance

export type ResType = {
  errno: number
  data?: any
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
