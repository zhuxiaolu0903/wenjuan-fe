import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isEllipsis, isStrong, isItalic, isUnderline, isDelete, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      isEllipsis,
      isStrong,
      isItalic,
      isUnderline,
      isDelete
    })
  }, [text, isEllipsis, isStrong, isItalic, isUnderline, isDelete])
  const handleValuesChange = () => {
    if (onChange == null) return
    onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isEllipsis, isStrong, isItalic, isUnderline, isDelete }}
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
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="isStrong" valuePropName="checked">
        <Checkbox>是否加粗</Checkbox>
      </Form.Item>
      <Form.Item name="isItalic" valuePropName="checked">
        <Checkbox>是否斜体</Checkbox>
      </Form.Item>
      <Form.Item name="isUnderline" valuePropName="checked">
        <Checkbox>是否添加下划线样式</Checkbox>
      </Form.Item>
      <Form.Item name="isDelete" valuePropName="checked">
        <Checkbox>是否添加删除线样式</Checkbox>
      </Form.Item>
      <Form.Item label="布局" name="isEllipsis" valuePropName="checked">
        <Checkbox>自动溢出省略</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
