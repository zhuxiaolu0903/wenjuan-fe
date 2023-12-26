import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionButtonPropsType } from './interface'

const PropComponent: FC<QuestionButtonPropsType> = (props: QuestionButtonPropsType) => {
  const { text, type, isBlock, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      type,
      isBlock
    })
  }, [text, type, isBlock])
  const handleValuesChange = () => {
    if (onChange == null) return
    onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, type, isBlock }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="文本"
        name="text"
        rules={[
          {
            required: true,
            message: '请输入文本'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="类型" name="type">
        <Select
          options={[
            { value: 'primary', label: '主按钮' },
            { value: 'default', label: '次按钮' },
            { value: 'dashed', label: '虚线按钮' },
            { value: 'text', label: '文本按钮' },
            { value: 'link', label: '链接按钮' }
          ]}
        />
      </Form.Item>
      <Form.Item label="布局" name="isBlock" valuePropName="checked">
        <Checkbox>是否铺满整行</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
