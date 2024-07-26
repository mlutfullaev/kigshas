import { useEffect, useState } from 'react'
import { DatePickerValue, IFault } from '@/tools/types.ts'
import SearchTime from '@/components/SearchTime/SearchTime.tsx'
import { getTime, getTimeForBack } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'
import axios from 'axios'
import { API_URL } from '@/main.tsx'

const FaultsPage = () => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(new Date())
  const [faults, setFaults] = useState<IFault[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/fault/`)
      .then(res => {
        setFaults(res.data.results)
      })
  }, [])

  const onSearch = () => {
    if (!searchDate) return

    const data  =  {
      check_out_time: getTimeForBack(searchDate.toString())
    }
    axios.get(`${API_URL}/fault/`, { data })
      .then(res => {
        setFaults(res.data.results)
      })
  }
  
  return (
    <div className="faults-page page-content">
      <SearchTime value={searchDate} setValue={setSearchDate} onSearch={onSearch} />
      <BaseTable className="errors-table" headers={['Время', 'Ошибка']}>
        {
          faults.map(fault =>
            <div key={fault.id} className="table-column">
              <div className="table-item">
                <p>{getTime(fault.check_out_time)}</p>
              </div>
              <div className="table-item error">
                <p>{fault.name}</p>
              </div>
            </div>
          )
        }
      </BaseTable>
    </div>
  )
}

export default FaultsPage