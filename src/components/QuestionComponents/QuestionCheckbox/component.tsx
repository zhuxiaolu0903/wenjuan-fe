import { Checkbox, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, options = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '4px' }}>
        {title}
      </Paragraph>
      <div style={{ marginBottom: '8px' }}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt) => {
            const { value, label } = opt
            return (
              <Checkbox key={value} value={value}>
                {label}
              </Checkbox>
            )
          })}
        </Space>
      </div>
    </div>
  )
}

export default QuestionRadio
