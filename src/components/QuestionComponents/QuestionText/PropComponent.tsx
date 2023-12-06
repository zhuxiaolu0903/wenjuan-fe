import React, { FC, useEffect } from 'react'
import { Checkbox, ColorPicker, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, color, isCenter, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      color,
      isCenter
    })
  }, [text, level, color, isCenter])

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter, color }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="尺寸" name="level">
        <Select
          options={[
            { value: 1, label: '一级标题' },
            { value: 2, label: '二级标题' },
            { value: 3, label: '三级标题' },
            { value: 4, label: '四级标题' },
            { value: 5, label: '五级标题' }
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="颜色" name="color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
