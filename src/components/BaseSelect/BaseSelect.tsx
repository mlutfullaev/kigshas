import { SelectType } from '@/assets/types.ts'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

type BaseSelectProps = {
  state: string
  setState: (value: string) => void
  onCreate?: (value: string) => void
  options: SelectType[]
}

const BaseSelect = ({ state, setState, onCreate, options }: BaseSelectProps) => {
  if (onCreate) {
    return (
      <CreatableSelect
        value={{ value: state, label: state }}
        onChange={(e) => setState(e?.value || '')}
        options={options}
        classNamePrefix="main-select"
        closeMenuOnScroll={true}
        isSearchable={true}
        noOptionsMessage={() => <span>Нету варианта</span>}
        formatCreateLabel={(obj) => <span>Создать {obj}</span>}
        onCreateOption={onCreate}
      />
    )
  }
  return (
    <Select
      value={{ value: state, label: state }}
      onChange={(e) => setState(e?.value || '')}
      options={options}
      classNamePrefix="main-select"
      closeMenuOnScroll={true}
      noOptionsMessage={() => <span>Нету варианта</span>}
    />
  )
}

export default BaseSelect