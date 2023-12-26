import Component from './component'
import { QuestionCheckboxDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '多选组',
  icon: 'checkbox-icon',
  type: 'questionCheckbox', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps
}
