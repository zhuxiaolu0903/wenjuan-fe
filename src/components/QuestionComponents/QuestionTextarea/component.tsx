import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'
const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '4px' }}>
        {title}
      </Paragraph>
      <div style={{ marginBottom: '8px' }}>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default QuestionTextarea
