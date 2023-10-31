import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import { LIST_IGNORE } from 'antd/es/upload/Upload'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'

type OptionType = {
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isDeleted } = opt
  // 设置参数
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_IGNORE) || '',
    page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || ''),
    pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
  const params = {
    keyword,
    isDeleted,
    page,
    pageSize
  }
  // userLoadQuestionListData函数执行、依赖项发生改变时立即执行请求
  const { data, loading, refresh } = useRequest(async () => await getQuestionListService(params), {
    refreshDeps: [searchParams] // 刷新的依赖项
  })

  return {
    data,
    loading,
    refresh
  }
}

export default useLoadQuestionListData
