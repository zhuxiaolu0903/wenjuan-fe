import Component from './component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '文本',
  icon: 'text-icon',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps
}
