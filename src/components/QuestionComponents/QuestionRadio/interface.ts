export type OptionType = {
  label: string
  value: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  size?: 'large' | 'middle' | 'small'

  // 用于 PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: '选项1', label: '选项1' },
    { value: '选项2', label: '选项2' },
    { value: '选项3', label: '选项3' }
  ],
  size: 'middle'
}
