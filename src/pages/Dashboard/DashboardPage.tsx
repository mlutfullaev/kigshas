import './dashboardPage.scss'
import Select from 'react-select'
import { tableSizeOptions } from '@/tools/data.ts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IEvent } from '@/tools/types.ts'
import { getTime } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'
import BaseModal from '@/components/BaseModal/BaseModal.tsx'

const dashboardHeaders = [
  'Время',
  '№ Рудоспуска',
  '№ ШАС',
  'КИГ % тон',
  'Масса тонн',
  '% Налипания по массе'
]
const DashboardPage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [eventsSize, setEventsSize] = useState(0)
  const [size, setSize] = useState(Number(localStorage.getItem('table_size')) || tableSizeOptions[0].value)
  const [newItem, setNewItem] = useState(0)
  const [disconnectedModal, setDisconnectedModal] = useState(false)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws')

    socket.onopen = () => {
      console.log('Connected to the WebSocket')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setNewItem(oldItems => ++oldItems)
      setEvents(events => [data, ...events])
    }

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket')
      setDisconnectedModal(true)
    }

    return () => {
      socket.close()
    }
  }, [])

  const getEvents = (size: number, events: IEvent[]) => {
    axios.get(`${API_URL}/events/`, {
      params: {
        per_page: size,
        page: Math.ceil(events.length / size) + 1,
      }
    })
      .then(res => {
        setEvents(oldEvents => [...oldEvents, ...res.data.results])
        setEventsSize(res.data.count)
      })
  }

  const resetTable = () => {
    setEvents([])
    setNewItem(0)
    getEvents(size, [])
  }

  useEffect(() => {
    localStorage.setItem('table_size', size.toString())
    setEvents([])
    getEvents(size, [])
  }, [size])
  
  return (
    <div className="dashboard-page">
      <div className="table-size">
        <p>Количество строк:</p>
        <Select
          value={{ value: size, label: size }}
          onChange={(e) => setSize(e ? e.value : tableSizeOptions[0].value)}
          options={tableSizeOptions}
          classNamePrefix="dashboard-select"
          isSearchable={false}
          closeMenuOnScroll={true}
        />
      </div>
      <BaseTable
        className="dashboard-table"
        headers={dashboardHeaders}
        newData={newItem}
        resetTable={resetTable}
        loadMore={() => events.length < eventsSize && getEvents(size, events)}
      >
        {
          events.map(event => (
            <div className="table-column" key={event.id}>
              <div className="table-item">
                <p>{getTime(event.check_out_time)}</p>
              </div>
              <div className="table-item">
                <p>{event.service.descent.name || '-'}</p>
              </div>
              <div className={`table-item${!event.vehicle?.number ? ' error' : ''}`}>
                <p>{event.vehicle?.number || 'Не удалось считать метку'}</p>
              </div>
              <div className={`table-item${event.kig && Number(event.kig) < 40 ? ' warning' : Number(event.kig) < 80 ? ' error' : ''}`}>
                <p>{event.kig ? event.kig + '%' : '-'}</p>
              </div>
              <div className="table-item">
                <p>{Number(event.mass).toFixed(1) || '-'}</p>
              </div>
              <div className={`table-item${event.sticking && Number(event.sticking) >= 40 ? ' warning' : Number(event.sticking) >= 10 ? ' error' : ''}`}>
                <p>{event.sticking ? event.sticking + '%' : '-'}</p>
              </div>
            </div>
          ))
        }
      </BaseTable>
      <BaseModal
        active={disconnectedModal}
        hide={() => setDisconnectedModal(false)}
      >
        <h2 className="red">Потеря связи c сервером</h2>
      </BaseModal>
    </div>
  )
}

export default DashboardPage