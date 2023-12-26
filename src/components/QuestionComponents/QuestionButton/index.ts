import Component from './component'
import { QuestionButtonDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '按钮',
  icon: 'button-icon',
  type: 'questionButton', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 属性显示的组件
  defaultProps: QuestionButtonDefaultProps
}
