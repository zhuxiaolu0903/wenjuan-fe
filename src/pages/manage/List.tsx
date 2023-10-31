import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Button, Divider, Empty, Space, Spin } from 'antd'
import { SwapRightOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import { getQuestionListService } from '../../services/question'

const List: FC = () => {
  useTitle('问卷星球—我的问卷')

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  // 是否开始加载，用于初始页面加载动画
  // 为什么不用loading，由于请求发出时机有一定的延迟，需要初始状态就为true，因此loading就不合适了
  const [isStartLoad, setIsStartLoad] = useState(true)
  const haveMoreData = list.length < total

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  const init = () => {
    setIsStartLoad(true)
    setList([])
    setTotal(0)
    setPage(1)
  }

  // 查询条件切换时，需要清空状态，重新加载
  useEffect(() => {
    init()
  }, [keyword])

  // 自动执行：在组件初次加载时，会自动触发该函数执行
  // 手动执行， run  manual
  const { run: load, refresh } = useRequest(
    async () =>
      await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword
      }),
    {
      manual: true, // 手动执行
      onSuccess(result) {
        const { list: dataList = [], total = 0 } = result
        setList(list.concat(dataList)) // 累计
        setTotal(total)
        setPage(page + 1)
        setIsStartLoad(false)
      }
    }
  )

  // 1、初次加载，或searchParams发生变化时加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  const centerRef = useRef<HTMLDivElement>(null)
  // 2. 当页面滚动时，要尝试触发加载
  useEffect(() => {
    const elem = centerRef.current
    if (elem == null) return
    if (haveMoreData && elem) {
      elem.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      elem.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // 尝试加载
  const { run: tryLoadMore } = useDebounceFn(() => {
    const elem = centerRef.current
    if (!elem) return
    if (elem.scrollHeight - elem.scrollTop - elem.offsetHeight <= 0) {
      // 列表最底部出现在视野内，开始加载
      load()
    }
  }, {})

  return (
    <div className={styles['question-list-container']}>
      <div className={styles['header']}>
        <div className={styles['title']}>我的问卷</div>
        <div className={styles['search']}>
          <Space style={{ cursor: 'pointer' }}>
            <ListSearch />
          </Space>
        </div>
      </div>
      <div className={styles['center']} ref={centerRef}>
        {isStartLoad ? (
          <Spin
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'calc(100% - 18px)'
            }}
          />
        ) : list.length === 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'calc(100% - 18px)'
            }}
            description={<span>您还没有问卷，请前往创建您的第一份问卷</span>}
          >
            <Button type="primary" icon={<SwapRightOutlined />}>
              立即前往
            </Button>
          </Empty>
        ) : (
          list.map((item: any, index) => (
            <QuestionCard
              {...item}
              key={item._id}
              isLast={index === list.length - 1}
              onRefresh={() => {
                // 重新加载
                init()
                refresh()
              }}
            />
          ))
        )}
        <div className={styles['load-more']}>
          {isStartLoad ? '' : !haveMoreData ? '真的没有了...' : '正在加载更多...'}
        </div>
      </div>
    </div>
  )
}

export default List
