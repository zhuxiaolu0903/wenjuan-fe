import React, { FC, useEffect } from 'react'
import { Button, Form, Input, Radio, Space } from 'antd'
import { QuestionRadioPropsType } from './interface'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, size, options, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, size, options })
  }, [title, isVertical, value, size, options])
  const handleValuesChange = () => {
    if (onChange == null) return
    const newValues = form.getFieldsValue()
    console.log(newValues.options)
    // 需要清除 label为 undefined 的选项
    if (newValues.options) {
      newValues.options = newValues.options.filter((opt) => opt.label !== undefined)
    }
    const { options = [] } = newValues
    options.forEach((opt) => {
      if (opt.value) return
      // 补齐 opt value
      opt.value = opt.label
    })
    onChange(newValues)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, size, options }}
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
      <Form.List name="options">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <div style={{ flex: '1' }}>
                  <Form.Item
                    name={[name, 'label']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, label) => {
                          if (label === '') return Promise.resolve()
                          const { options = [] } = form.getFieldsValue()
                          let num = 0
                          options.forEach((opt) => {
                            // 记录 text 相同的个数，预期只有 1 个（自己）
                            if (opt.label === label) num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject(new Error('和其他选项重复了'))
                        }
                      }
                    ]}
                  >
                    <Input placeholder="请输入选项文字..." />
                  </Form.Item>
                </div>
                {fields.length > 1 && <DeleteOutlined onClick={() => remove(name)} />}
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                block
                onClick={() => add({ label: '', value: '' })}
                icon={<PlusOutlined />}
              ></Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default PropComponent
