import './services.scss'
import successIcon from '../../assets/icons/success.svg'
import errorIcon from '../../assets/icons/error.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IService } from '@/tools/types.ts'

const Services = () => {
  const [services, setServices] = useState<IService[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/services/`)
      .then(res => {
        setServices(res.data)
      })
  }, [])

  const onReset = () => {
    axios.get(`${API_URL}/command`)
  }
  
  return (
    <div className="page-content services-page">
      <ul>
        {
          services.map(service =>
            <li key={service.id}>
              <p>{service.name} {service.descent.name}</p>
              <img src={service.status === 'active' ? successIcon : errorIcon} alt="status"/>
            </li>
          )
        }
      </ul>
      <button className="btn btn-red" onClick={onReset}>Перезапуск системы</button>
    </div>
  )
}

export default Services