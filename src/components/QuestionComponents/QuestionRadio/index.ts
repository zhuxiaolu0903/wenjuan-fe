import Component from './component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// 组件配置，通过这个配置能渲染指定组件
export default {
  title: '单选组',
  icon: 'radio-icon',
  type: 'questionRadio', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps
}
