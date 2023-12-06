import { FC } from 'react'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionText'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'

// 统一，各个组件的 prop type
export type ComponentPropsType = QuestionTitlePropsType & QuestionInputPropsType

// 统一，组件的配置 type
export type ComponentConfType = {
  title: string
  icon: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'show',
    groupName: '展示',
    components: [QuestionTitleConf]
  },
  {
    groupId: 'form',
    groupName: '表单',
    components: [QuestionInputConf]
  }
]
