import { Color } from 'antd/es/color-picker'

export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  color?: Color | string
  isCenter?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行文本',
  level: 2,
  color: '#333333',
  isCenter: false
}
