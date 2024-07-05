import { SelectType } from '@/tools/types.ts'
import CreatableSelect from 'react-select/creatable'
import Select, { SingleValue } from 'react-select'

type BaseSelectProps = {
  state: SelectType | null
  setState: (value: SelectType) => void
  onCreate?: (value: string) => void
  error?: boolean
  options: SelectType[]
}

const BaseSelect = ({ state, setState, onCreate, options, error }: BaseSelectProps) => {
  const baseOptions = {
    value: state,
    onChange: (e: SingleValue<SelectType>) => e && setState(e),
    options: options,
    classNamePrefix: 'main-select',
    className: error && !state ? 'error' : '',
    placeholder: 'Выберите',
    closeMenuOnScroll: true,
    noOptionsMessage: () => <span>Нету варианта</span>,
  }
  if (onCreate) {
    return (
      <CreatableSelect
        {...baseOptions}
        isSearchable={true}
        formatCreateLabel={(obj) => <span>Создать {obj}</span>}
        onCreateOption={onCreate}
      />
    )
  }
  return (
    <Select
      {...baseOptions}
      isSearchable={false}
      noOptionsMessage={() => <span>Нету варианта</span>}
    />
  )
}

export default BaseSelect