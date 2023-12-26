/**
 * @description 生成组件列表
 * @author 双越老师
 */

const Mock = require('mockjs')

const Random = Mock.Random

function getComponentList() {
  return [
    // Title
    {
      fe_id: 'c2',
      type: 'questionTitle', // 组件类型，不能重复，前后端统一好
      title: '标题',
      isHidden: false,
      isLocked: false,
      props: { text: '个人信息调研', level: 3, color: '#333333', isCenter: false }
    },
    // Input
    {
      fe_id: 'c3',
      type: 'questionInput',
      title: '输入框1',
      isHidden: false,
      isLocked: false,
      props: { title: '你的姓名', placeholder: '请输入姓名...' }
    },
    // Input
    {
      fe_id: 'c4',
      type: 'questionInput',
      title: '输入框2',
      isHidden: false,
      isLocked: false,
      props: { title: '你的电话', placeholder: '请输入电话...' }
    },
    // Textarea
    // {
    //     fe_id: 'c5',
    //     type: 'questionTextarea',
    //     title: '多行输入',
    //     isHidden: false,
    //     isLocked: false,
    //     props: { title: '你的爱好', placeholder: '请输入...' }
    // },
    // // Paragraph
    // {
    //     fe_id: 'c6',
    //     type: 'questionParagraph',
    //     title: '段落',
    //     isHidden: false,
    //     isLocked: false,
    //     props: { text: '一行段落1\n一行段落2', isCenter: false }
    // },
    // Radio
    {
      fe_id: 'c7',
      type: 'questionRadio',
      title: '单选',
      isHidden: false,
      isLocked: false,
      props: {
        title: '上课是否觉得无聊',
        isVertical: true,
        options: [
          { value: 'item1', label: '非常无聊' },
          { value: 'item2', label: '有点无聊' },
          { value: 'item4', label: '有趣' },
          { value: 'item5', label: '非常有趣' }
        ],
        value: ''
      }
    },
    // Checkbox
    {
      fe_id: 'c8',
      type: 'questionCheckbox',
      title: '多选',
      isHidden: false,
      isLocked: false,
      props: {
        title: '最喜欢的课程',
        isVertical: true,
        options: [
          { value: 'item1', label: '语文' },
          { value: 'item2', label: '数学' },
          { value: 'item3', label: '英语' },
          { value: 'item4', label: '地理' },
          { value: 'item5', label: '生物' }
        ]
      }
    }
  ]
}

module.exports = getComponentList
