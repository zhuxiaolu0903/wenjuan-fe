import React, { FC, useEffect, useState } from 'react'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Button, Divider, Empty, Pagination, Space, Table, Tag } from 'antd'
import { DeleteOutlined, SwapRightOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'

const Trash: FC = () => {
  useTitle('问卷星球—回收站')

  const [isStartLoad, setIsStartLoad] = useState(true)
  const { data = {}, loading, refresh } = useLoadQuestionListData()
  const { list = [], total = 0 } = data

  useEffect(() => {
    if (isStartLoad && !loading) {
      setIsStartLoad(false)
    }
  }, [loading])
  const handleRestoreQuestion = (row: any) => {
    console.log(row)
  }

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
      <div className={styles['tool-list-container']}>
        <Button icon={<DeleteOutlined />} danger type={'text'}>
          清空回收站
        </Button>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        rowKey={(item) => item._id}
        loading={loading}
        pagination={false}
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
