import './errorsPage.scss'
import SearchTime from '@/components/SearchTime/SearchTime.tsx'
import { useState } from 'react'
import { DatePickerValue } from '@/tools/types.ts'
import { getTime } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'

const ErrorsPage = () => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(new Date())

  return (
    <div className="errors-page page-content">
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

export default ErrorsPage