export interface InputSelectProps {
  label?: string
  placeholder?: string
  error?: string
  data: OptionProps[]
  inputid?: string
  inputSearch?: string
  onClick?: () => void
  onChange?: () => void
}

export interface OptionProps {
  label: string
  value: string
}
