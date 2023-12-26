import { Radio, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title,
    isVertical,
    options = [],
    value,
    size
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '4px' }}>
        {title}
      </Paragraph>
      <div style={{ marginBottom: '8px' }}>
        <Radio.Group value={value} size={size}>
          <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {options.map((opt) => {
              const { value, label } = opt
              return (
                <Radio key={value} value={value}>
                  {label}
                </Radio>
              )
            })}
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}

export default QuestionRadio
