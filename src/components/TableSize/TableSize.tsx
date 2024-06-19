import './tableSize.scss'
import Select from 'react-select'
import { tableSizeOptions } from '@/assets/data.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store.ts'
import { changeTableSize } from '@/store/tableSlice.ts'

const TableSize = () => {
  const size = useSelector((state: RootState) => state.table.size)
  const dispatch = useDispatch()

  return (
    <div className="table-size">
      <p>Количество строк:</p>
      <Select
        value={{ value: size, label: size }}
        onChange={(e) => dispatch(changeTableSize(e ? e.value : tableSizeOptions[0].value))}
        options={tableSizeOptions}
        classNamePrefix="react-select"
        closeMenuOnScroll={true}
      />
    </div>
  )
}

export default TableSize