import { Typography } from 'antd'
import React, { FC, useMemo } from 'react'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const {
    text,
    level = 1,
    isCenter = false,
    color: colorHex
  } = { ...QuestionTitleDefaultProps, ...props }
  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        fontSize: genFontSize(level),
        color: !colorHex
          ? '#333333'
          : useMemo(
              () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
              [colorHex]
            )
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
