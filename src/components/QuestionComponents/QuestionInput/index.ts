import Component from './component'
import { QuestionInputDefaultProps } from './interface'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component, // 画布显示的组件
  defaultProps: QuestionInputDefaultProps
}
