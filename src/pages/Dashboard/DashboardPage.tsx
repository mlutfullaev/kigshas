import './dashboardPage.scss'
import Select from 'react-select'
import { tableSizeOptions } from '@/assets/data.ts'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IEvent } from '@/assets/types.ts'
import { getTime } from '@/assets/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'

const dashboardHeaders = [
  'Время',
  '№ Рудоспуска',
  '№ ШАС',
  'КИГ % тон',
  'Масса тонн',
  '% Налипания в объеме'
]
const DashboardPage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [nextPage, setNextPage] = useState(true)
  const [size, setSize] = useState(tableSizeOptions[0].value)

  const getEvents = useCallback(() => {
    if (!nextPage) return
    axios.get(`${API_URL}/events`, {
      params: {
        per_page: size,
        page: Math.ceil(events.length / size) + 1,
      }
    })
      .then(res => {
        setEvents(oldEvents => [...oldEvents, ...res.data.results])
        if (!res.data.next) {
          setNextPage(false)
        }
      })
  }, [events.length, nextPage, size])

  useEffect(() => {
    getEvents()
  }, [getEvents])
  
  return (
    <div className="dashboard-page">
      <div className="table-size">
        <p>Количество строк:</p>
        <Select
          value={{ value: size, label: size }}
          onChange={(e) => setSize(e ? e.value : tableSizeOptions[0].value)}
          options={tableSizeOptions}
          classNamePrefix="react-select"
          closeMenuOnScroll={true}
        />
      </div>
      <BaseTable className="dashboard-table" headers={dashboardHeaders} loadMore={getEvents}>
        {
          events.map(event => (
            <div className="table-column">
              <div className="table-item">
                <p>{getTime(event.check_in_time)}</p>
              </div>
              <div className="table-item">
                <p>{event.service.descent.name}</p>
              </div>
              <div className={`table-item${!event.vehicle.number ? ' error' : ''}`}>
                <p>{event.vehicle.number || 'Не удалось считать метку'}</p>
              </div>
              <div className={`table-item${event.kig && Number(event.kig) < 90 ? ' error' : ''}`}>
                <p>{event.kig ? event.kig + '%' : '-'}</p>
              </div>
              <div className="table-item">
                <p>{event.unloaded_volume || '-'}</p>
              </div>
              <div className={`table-item${event.sticking && Number(event.sticking) > 10 ? ' error' : ''}`}>
                <p>{event.sticking ? event.sticking + '%' : '-'}</p>
              </div>
            </div>
          ))
        }
      </BaseTable>
    </div>
  )
}

export default DashboardPage