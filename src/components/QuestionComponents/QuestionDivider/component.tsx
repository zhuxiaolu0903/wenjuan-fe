import React, { FC } from 'react'
import { Divider } from 'antd'
import { QuestionDividerPropsType, QuestionDividerDefaultProps } from './interface'

const QuestionDivider: FC<QuestionDividerPropsType> = (props: QuestionDividerPropsType) => {
  const { text, dashed, orientation } = { ...QuestionDividerDefaultProps, ...props }

  return (
    <div>
      <Divider dashed={dashed} orientation={orientation}>
        {text}
      </Divider>
    </div>
  )
}

export default QuestionDivider
