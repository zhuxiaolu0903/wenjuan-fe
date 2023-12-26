import React, { CSSProperties, FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { Collapse, CollapseProps } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import styles from './ComponentLib.module.scss'
import { useAppDispatch } from '../../../redux/hooks'
import { nanoid } from 'nanoid'
import { addComponent } from '../../../redux/components/slice'

const ComponentLib: FC = () => {
  const dispatch = useAppDispatch()
  const handleAddComponent = (component: ComponentConfType) => {
    const { title, type, defaultProps } = component
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps
      })
    )
  }
  const groupItem: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) =>
    componentConfGroup.map((group) => {
      const { groupId, groupName, components } = group
      return {
        key: groupId,
        label: groupName,
        children: (
          <ul className={styles['component-group-box']}>
            {components.map((c: ComponentConfType) => (
              <li
                key={c.type}
                className={styles['component-item-box']}
                onClick={() => handleAddComponent(c)}
              >
                <i className={styles[c.icon]} />
                <span>{c.title}</span>
              </li>
            ))}
          </ul>
        ),
        style: panelStyle
      }
    })

  const panelStyle: React.CSSProperties = {
    margin: '0 -8px',
    borderColor: '#f0f0f0',
    backgroundColor: '#ffffff'
  }

  return (
    <Collapse
      size={'small'}
      bordered={false}
      defaultActiveKey={componentConfGroup.map((group) => group.groupId)}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} size={12} style={{ color: '#999999' }} />
      )}
      items={groupItem(panelStyle)}
    />
  )
}

export default ComponentLib
