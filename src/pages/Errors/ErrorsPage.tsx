import SearchTime from '@/components/SearchTime/SearchTime.tsx'
import { useState } from 'react'
import { DatePickerValue } from '@/assets/types.ts'

const ErrorsPage = () => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(new Date())

  return (
    <div className="errors-page page-content">
      <SearchTime value={searchDate} setValue={setSearchDate} />
    </div>
  )
}

export default ErrorsPage