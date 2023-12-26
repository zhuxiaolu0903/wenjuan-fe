export type QuestionParagraphPropsType = {
  text?: string
  isEllipsis?: boolean
  isStrong?: boolean
  isItalic?: boolean
  isUnderline?: boolean
  isDelete?: boolean
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isEllipsis: false,
  isStrong: false,
  isItalic: false,
  isUnderline: false,
  isDelete: false
}
