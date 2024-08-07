import './dashboardPage.scss'
import Select from 'react-select'
import { tableSizeOptions } from '@/tools/data.ts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IEvent } from '@/tools/types.ts'
import { getTime } from '@/tools/helpers.ts'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'

const dashboardHeaders = [
  'Время',
  '№ Рудоспуска',
  '№ ШАС',
  'КИГ % тон',
  'Масса тонн',
  '% Налипания по массе'
]
type IModalContent = {
  service_id: number,
  code?: string,
  name: string
}
const DashboardPage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [eventsSize, setEventsSize] = useState(0)
  const [size, setSize] = useState(Number(localStorage.getItem('table_size')) || tableSizeOptions[0].value)
  const [newItem, setNewItem] = useState(0)
  const [faults, setFaults] = useState<IModalContent[]>([])
  const [errors, setErrors] = useState<IModalContent[]>([])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws')

    socket.onopen = () => {
      console.log('Connected to the WebSocket')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)

      // Service Online
      if (!data.id && data.service.status === 'online') {
        setFaults(oldItems => oldItems.filter(item => Number(item.service_id) !== Number(data.service.id)))
        return
      }

      // Ошибка или Авария
      if (data.code) {
        const modalContent: IModalContent = {
          code: data.code,
          name: data.name,
          service_id: data.service_id
        }
        if (Number(data.code) <= 100) {
          setFaults(oldItems =>
            [...oldItems.filter(item => item.service_id !== data.service_id), modalContent]
          )
          return
        } else {
          setErrors(oldItems =>
            [...oldItems.filter(item => item.service_id !== data.service_id), modalContent]
          )
        }
      }

      // Добавление в таблицу
      const newEvent = {
        ...data,
        service: {
          ...data.service,
          descent: {
            name: data.service.descent,
          }
        }
      }
      setNewItem(oldItems => ++oldItems)
      setEvents(events => [newEvent, ...events])
    }

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket')
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
        setEvents([...events, ...res.data.results])
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

  useEffect(() => {
    errors.forEach(error => {
      // Удаление ошибки
      if (Number(error.code) > 100) {
        const timeout = setTimeout(() => {
          setErrors(oldItems =>
            oldItems.filter(item => item.service_id !== error.service_id)
          )
        }, 3000)

        return () => {
          clearTimeout(timeout)
        }
      }
    })
  }, [errors])
  
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
                <p>{
                  Number(event.code) >= 102 ? 'Не удалось рассчитать КИГ' :
                    event.vehicle?.number || 'Не удалось считать метку'}</p>
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
      <div className={`modal${faults.length || errors.length ? ' active' : ''}`}>
        {
          faults.map(fault => (
            <div className="modal-content" key={fault.service_id}>
              {
                fault.code ? <p className="subtitle">Критическая {fault.code}</p> : null
              }
              <h2 className="title">{fault.name}</h2>
            </div>
          ))
        }
        {
          errors.map(error => (
            <div className="modal-content" key={error.service_id}>
              {
                error.code ? <p className="subtitle">Ошибка {error.code}</p> : null
              }
              <h2 className="title">{error.name}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DashboardPage