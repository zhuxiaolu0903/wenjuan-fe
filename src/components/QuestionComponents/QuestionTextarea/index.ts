import Component from './component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '多行输入',
  icon: 'textarea-icon',
  type: 'questionTextarea', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 属性显示的组件
  defaultProps: QuestionTextareaDefaultProps
}
