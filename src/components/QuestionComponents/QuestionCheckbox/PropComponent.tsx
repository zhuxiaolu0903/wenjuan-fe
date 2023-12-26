import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionCheckboxPropsType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title
    })
  }, [title])
  const handleValuesChange = () => {
    if (onChange == null) return
    onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题'
          }
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
