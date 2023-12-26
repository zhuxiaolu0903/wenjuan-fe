import React, { FC, useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { OptionType, QuestionRadioPropsType } from './interface'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const MAX_OPTION_LEN = 8
const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, size, options, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, size, options })
  }, [title, isVertical, size, options])
  const handleValuesChange = () => {
    if (onChange == null) return
    const newValues = form.getFieldsValue()
    // 需要清除 label为 undefined 的选项
    if (newValues.options) {
      newValues.options = newValues.options.filter((opt: OptionType) => opt.label !== undefined)
    }
    const { options = [] } = newValues
    options.forEach((opt: OptionType) => {
      if (opt.value) return
      // 补齐 opt value
      // 这里使用nanoid而不使用opt.label，是因为新添加时，label和value都为空，问卷渲染时，单选组的key[value为key]就重复了
      opt.value = nanoid(5)
    })
    onChange(newValues)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, size, options }}
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
      <Form.Item label="选项设置">
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
                            options.forEach((opt: OptionType) => {
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
              {fields.length < MAX_OPTION_LEN && (
                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    onClick={() => add({ label: '', value: '' })}
                    icon={<PlusOutlined />}
                  ></Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="排列方向" name="isVertical">
        <Select
          options={[
            { value: true, label: '垂直' },
            { value: false, label: '水平' }
          ]}
        />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
