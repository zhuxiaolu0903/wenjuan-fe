export type QuestionButtonPropsType = {
  text?: string
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed'
  isBlock?: boolean
  onChange?: (newProps: QuestionButtonPropsType) => void
  disabled?: boolean
}

export const QuestionButtonDefaultProps: QuestionButtonPropsType = {
  text: '按钮',
  type: 'primary',
  isBlock: false
}
