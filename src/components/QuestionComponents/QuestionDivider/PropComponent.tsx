import React, { FC, useEffect } from 'react'
import { Form, Input, Radio, Select } from 'antd'
import { QuestionDividerPropsType } from './interface'

const PropComponent: FC<QuestionDividerPropsType> = (props: QuestionDividerPropsType) => {
  const { text, dashed, orientation, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      dashed,
      orientation
    })
  }, [text, dashed, orientation])
  const handleValuesChange = () => {
    if (onChange == null) return
    onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, dashed, orientation }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="文本" name="text">
        <Input placeholder="带文字的分割线" />
      </Form.Item>
      <Form.Item label="线条类型" name="dashed">
        <Radio.Group>
          <Radio value={false}>实线</Radio>
          <Radio value={true}>虚线</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="内容位置" name="orientation">
        <Select
          options={[
            { value: 'left', label: '靠左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '靠右' }
          ]}
        />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
