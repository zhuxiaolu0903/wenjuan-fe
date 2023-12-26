import { Checkbox, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, options = [] } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong style={{ marginBottom: '4px' }}>
        {title}
      </Paragraph>
      <div style={{ marginBottom: '8px' }}>
        {isVertical ? (
          <Space direction="vertical">
            {options.map((opt) => {
              const { value, label } = opt
              return <Checkbox key={value}>{label}</Checkbox>
            })}
          </Space>
        ) : (
          <Checkbox.Group options={options} />
        )}
      </div>
    </div>
  )
}

export default QuestionCheckbox
