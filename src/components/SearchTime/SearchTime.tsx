import './searchTime.scss'
import DatePicker from 'react-date-picker'
import { DatePickerValue } from '@/tools/types.ts'

type SearchTimeProps = {
  value: DatePickerValue;
  setValue: (value: DatePickerValue) => void;
  onSearch: () => void;
}

const SearchTime = ({ value, setValue, onSearch }: SearchTimeProps) => {
  return (
    <div className="search-time">
      <div className="search-time-input">
        <label>Поиск</label>
        <DatePicker
          value={value}
          onChange={setValue}
          clearIcon={null}
        />
      </div>
      <button onClick={onSearch} className="btn btn-blue">Поиск</button>
    </div>
  )
}

export default SearchTime