export type QuestionDividerPropsType = {
  text?: string
  dashed?: boolean
  orientation?: 'center' | 'left' | 'right'
  onChange?: (newProps: QuestionDividerPropsType) => void
  disabled?: boolean
}

export const QuestionDividerDefaultProps: QuestionDividerPropsType = {
  text: '', // 默认是不带文本的分割线
  dashed: false,
  orientation: 'center'
}
