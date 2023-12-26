import { FC } from 'react'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionText'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionButtonConf, { QuestionButtonPropsType } from './QuestionButton'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionDividerConf, { QuestionDividerPropsType } from './QuestionDivider'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox'

// 统一，各个组件的 prop type
export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionButtonPropsType &
  QuestionTextareaPropsType &
  QuestionDividerPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

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
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionButtonConf,
  QuestionTextareaConf,
  QuestionDividerConf,
  QuestionRadioConf,
  QuestionCheckboxConf
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'show',
    groupName: '展示',
    components: [QuestionDividerConf, QuestionButtonConf, QuestionTitleConf, QuestionParagraphConf]
  },
  {
    groupId: 'form',
    groupName: '表单',
    components: [QuestionInputConf, QuestionTextareaConf, QuestionRadioConf, QuestionCheckboxConf]
  }
]
