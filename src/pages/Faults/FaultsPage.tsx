import SearchTime from '@/components/SearchTime/SearchTime.tsx'
import { useCallback, useEffect, useState } from 'react'
import { DatePickerValue, IEvent } from '@/tools/types.ts'
import { getTime, getTimeForBack } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { useNavigate } from 'react-router-dom'

interface IFault extends IEvent {
  corrected?: boolean
}

const FaultsPage = () => {
  const [searchDate, setSearchDate] = useState<DatePickerValue>(null)
  const [search, setSearch] = useState('')
  const [faults, setFaults] = useState<IFault[]>([])
  const [faultsCount, setFaultsCount] = useState(0)
  const navigate = useNavigate()

  const getFaults = useCallback((faults: IFault[]) => {
    const params = {
      per_page: 20,
      page: Math.ceil(faults.length / 20) + 1,
      check_out_time: search ? getTimeForBack(search) : null
    }
    axios.get(`${API_URL}/fault/`, { params })
      .then(res => {
        const uniqueItems = res.data.results.reduce((acc: IFault[], current: IFault) => {
          const x = acc.find(item => item.service.id === current.service.id)
          if (!x) {
            acc.push(current)
          }
          return acc
        }, [])
        console.log(uniqueItems)
        setFaults( [...faults, ...res.data.results])
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
    getFaults([])
  }, [getFaults])

  const onSearch = () => {
    if (!searchDate) return
    setFaults([])
    setSearch(searchDate.toString())
  }


  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws')

    socket.onopen = () => {
      console.log('Connected to the WebSocket')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)

      if (!data.code) return

      const newEvent = {
        ...data,
        service: {
          id: data.service_id,
          ...data.service,
          descent: {
            name: data.service.descent,
          }
        }
      }
      setFaults(faults => [newEvent, ...faults])
    }

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket')
    }

    return () => {
      socket.close()
    }
  }, [faults])

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
        headers={['Время', 'Авария', 'Сервис']}
        loadMore={() => faults.length < faultsCount && getFaults(faults)}
      >
        {
          faults.map(fault =>
            <div key={fault.id} className="table-column">
              <div className="table-item">
                <p>{getTime(fault.check_out_time)}</p>
              </div>
              <div className={`table-item ${Number(fault.code) === 0 ? 'success' : 'error'}`}>
                <p>{fault.name}{Number(fault.code) === 0 ? ' (Устранено)' : ''}</p>
              </div>
              <div className={`table-item ${Number(fault.code) === 0 ? 'success' : 'error'}`}>
                <p>{fault.service.name} {fault.service.descent.name}</p>
              </div>
            </div>
          )
        }
      </BaseTable>
    </div>
  )
}

export default FaultsPage