import React, { FC } from 'react'
import { Button } from 'antd'
import { QuestionButtonPropsType, QuestionButtonDefaultProps } from './interface'

const QuestionButton: FC<QuestionButtonPropsType> = (props: QuestionButtonPropsType) => {
  const { text, type, isBlock } = { ...QuestionButtonDefaultProps, ...props }

  return (
    <div>
      <Button type={type} block={isBlock}>
        {text}
      </Button>
    </div>
  )
}

export default QuestionButton
