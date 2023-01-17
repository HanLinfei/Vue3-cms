// input的类型
type IFormType = "input" | "password" | "select" | "datepicker"
type ISelectOptions = {
  value: string
  label: string
}
// 栅格系统的布局类型
type IColLayoutType = {
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}
// 需要被渲染的item的类型
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: object[]
  placeholder?: string
  options?: ISelectOptions[]
}
// 表单的类型
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: IColLayoutType
  itemStyle?: object
}
