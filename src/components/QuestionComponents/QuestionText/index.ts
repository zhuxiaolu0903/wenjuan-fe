import Component from './component'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  defaultProps: QuestionTitleDefaultProps
}
