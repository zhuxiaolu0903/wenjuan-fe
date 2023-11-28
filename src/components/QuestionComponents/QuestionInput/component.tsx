import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'
const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '4px' }}>
        {title}
      </Paragraph>
      <div style={{ marginBottom: '8px' }}>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
