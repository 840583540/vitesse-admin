export interface IForm {
  prop: string
  label: string
  type: string
  show?: boolean
  rules?: any []
  el?: Record<string, any>
  options?: IOption []
}

export interface IOption {
  label: string
  value: string
}
