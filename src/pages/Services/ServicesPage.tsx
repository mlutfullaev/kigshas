import { useState } from 'react'
import { DatePickerValue } from '@/tools/types.ts'
import SearchTime from '@/components/SearchTime/SearchTime.tsx'
import { getTime } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'

const ServicesPage = () => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(new Date())
  
  return (
    <div className="services-page page-content">
      <SearchTime value={searchDate} setValue={setSearchDate}/>
      <BaseTable className="errors-table" headers={['Время', 'Ошибка']}>
        {
          new Array(10).fill(0).map(() => (
            <div className="table-column">
              <div className="table-item">
                <p>{getTime(new Date().getTime())}</p>
              </div>
              <div className="table-item error">
                <p>Не считалась метка</p>
              </div>
            </div>
          ))
        }
      </BaseTable>
    </div>
  )
}

export default ServicesPage