import './errorsPage.scss'
import SearchTime from '@/components/SearchTime/SearchTime.tsx'
import { useCallback, useEffect, useState } from 'react'
import { DatePickerValue, IFault } from '@/tools/types.ts'
import { getTime, getTimeForBack } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { useNavigate } from 'react-router-dom'

type ErrorsPageProps = {
  type: string
  tableName: string
}

const ErrorsPage = ({ type, tableName }: ErrorsPageProps) => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(null)
  const [search, setSearch] = useState('')
  const [faults, setFaults] = useState<IFault[]>([])
  const [faultsCount, setFaultsCount] = useState(0)
  const navigate = useNavigate()

  const getFaults = useCallback((faults: IFault[], type: string) => {
    const params = {
      per_page: 20,
      page: Math.ceil(faults.length / 20) + 1,
      check_out_time: search ? getTimeForBack(search) : null
    }

    axios.get(`${API_URL}/${type}/`, { params })
      .then(res => {
        setFaults(oldFaults => [...oldFaults, ...res.data.results])
        setFaultsCount(res.data.count)
      })
      .catch(e => {
        if (e.response.status === 401) {
          localStorage.removeItem('user')
          navigate('/login')
        }
      })
  }, [search])

  useEffect(() => {
    setFaults([])
    getFaults([], type)
  }, [getFaults, type])

  const onSearch = () => {
    if (!searchDate) return
    setFaults([])
    setSearch(searchDate.toString())
  }

  useEffect(() => {
    if (!searchDate) {
      setFaults([])
      setSearch('')
    }
  }, [searchDate])

  return (
    <div className="errors-page page-content">
      <SearchTime value={searchDate} setValue={setSearchDate} onSearch={onSearch}/>
      <BaseTable
        className="errors-table"
        headers={['Время', tableName, '№ Рудоспуска']}
        loadMore={() => faults.length < faultsCount && getFaults(faults, type)}
      >
        {
          faults.map(fault =>
            <div key={fault.id} className="table-column">
              <div className="table-item">
                <p>{getTime(fault.check_out_time)}</p>
              </div>
              <div className="table-item error">
                <p>{fault.name}</p>
              </div>
              <div className="table-item error">
                <p>{fault.service.descent.name}</p>
              </div>
            </div>
          )
        }
      </BaseTable>
    </div>
  )
}

export default ErrorsPage