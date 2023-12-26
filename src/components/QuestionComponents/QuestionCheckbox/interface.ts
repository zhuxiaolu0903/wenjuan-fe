export type OptionType = {
  label: string
  value: string
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]

  // 用于 PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  options: [
    { value: '选项1', label: '选项1' },
    { value: '选项2', label: '选项2' },
    { value: '选项3', label: '选项3' }
  ]
}
