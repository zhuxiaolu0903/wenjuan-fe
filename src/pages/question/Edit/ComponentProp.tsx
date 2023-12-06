import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../redux/components/slice'

const ComponentProp: FC = () => {
  const dispatch = useAppDispatch()
  // 通过selectedId拿到当前选中的组件
  const { selectedId, componentList } = useAppSelector((state) => state.components)
  const selectedComponent = componentList.find((component) => component.fe_id === selectedId)
  if (!selectedComponent) return <></>
  // 通过type拿到当前组件的配置信息
  const { fe_id, props, type } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <></>
  // 取到属性组件
  const { PropComponent } = componentConf
  const changeProps = (props: ComponentPropsType) => {
    dispatch(
      changeComponentProps({
        fe_id,
        newProps: props
      })
    )
  }
  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
