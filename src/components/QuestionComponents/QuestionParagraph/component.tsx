import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const {
    text = '',
    isEllipsis,
    isStrong,
    isItalic,
    isUnderline,
    isDelete
  } = {
    ...QuestionParagraphDefaultProps,
    ...props
  }
  // 处理手动换行
  const content = text?.split('\n')
  return (
    <div>
      <Paragraph
        ellipsis={isEllipsis}
        strong={isStrong}
        italic={isItalic}
        underline={isUnderline}
        delete={isDelete}
      >
        {content.map((c, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {c}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionParagraph
