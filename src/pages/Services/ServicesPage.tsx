import { useState } from 'react'
import { DatePickerValue } from '@/assets/types.ts'
import SearchTime from '@/components/SearchTime/SearchTime.tsx'

const ServicesPage = () => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(new Date())
  
  return (
    <div className="services-page page-content">
      <SearchTime value={searchDate} setValue={setSearchDate} />
    </div>
  )
}

export default ServicesPage