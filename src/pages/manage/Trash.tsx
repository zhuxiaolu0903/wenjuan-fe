import React, { FC, useEffect, useState } from 'react'
import styles from './common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import { Button, Divider, Empty, message, Pagination, Space, Table, Tag } from 'antd'
import { DeleteOutlined, SwapRightOutlined, UndoOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { deleteQuestionsService, updateQuestionService } from '../../services/question'

const Trash: FC = () => {
  useTitle('问卷星球—回收站')

  const [isStartLoad, setIsStartLoad] = useState(true)
  const { data = {}, loading, refresh } = useLoadQuestionListData()
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    if (isStartLoad && !loading) {
      setIsStartLoad(false)
    }
  }, [loading])
  const handleRestoreQuestion = (row: any) => {
    console.log(row)
  }

  const { run: recover, loading: recoverLoading } = useRequest(
    async () => {
      message.success('恢复中...', 0)
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.destroy()
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      }
    }
  )

  const { run: del, loading: delLoading } = useRequest(
    async () => {
      message.success('删除中...', 0)
      await deleteQuestionsService(selectedIds)
    },
    {
      manual: true,
      onSuccess: () => {
        message.destroy()
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      }
    }
  )

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '发布状态',
      dataIndex: 'isPublished',
      render(isPublished: boolean) {
        return (
          <Tag color={isPublished ? 'green' : 'default'} bordered={false}>
            {isPublished ? '已发布' : '未发布'}
          </Tag>
        )
      }
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount'
    },
    {
      title: '创建数量',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (_: any, { _id }: any) => (
        <Space style={{ columnGap: '0px' }}>
          <Button
            type={'link'}
            size={'small'}
            onClick={() => {
              handleRestoreQuestion(_id)
            }}
          >
            恢复
          </Button>
          <Divider type={'vertical'} />
          <Button type={'link'} size={'small'}>
            删除
          </Button>
        </Space>
      )
    }
  ]

  const TableContainer = (
    <div style={{ margin: '0 16px' }}>
      <Space className={styles['tool-list-container']}>
        <Button
          icon={<UndoOutlined />}
          type={'text'}
          style={{ color: '#07c160' }}
          onClick={recover}
          loading={recoverLoading}
          disabled={delLoading}
        >
          恢复
        </Button>
        <Button
          icon={<DeleteOutlined />}
          danger
          type={'text'}
          onClick={del}
          loading={delLoading}
          disabled={recoverLoading}
        >
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={tableColumns}
        rowKey={(item) => item._id}
        loading={loading}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[])
          }
        }}
      />
    </div>
  )

  return (
    <div className={styles['question-list-container']}>
      <div className={styles['header']}>
        <div className={styles['title']}>回收站</div>
        <div className={styles['search']}>
          <Space style={{ cursor: 'pointer' }}>
            <ListSearch />
          </Space>
        </div>
      </div>
      <div className={styles['center']}>
        {!isStartLoad && list.length === 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
            description={<span>您还没有问卷，请前往创建您的第一份问卷</span>}
          >
            <Button type="primary" icon={<SwapRightOutlined />}>
              立即前往
            </Button>
          </Empty>
        ) : (
          TableContainer
        )}
      </div>
      <div className={styles['footer']}>
        <ListPage total={total} />
      </div>
    </div>
  )
}

export default Trash
