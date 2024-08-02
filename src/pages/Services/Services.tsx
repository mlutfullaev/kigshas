import './services.scss'
import successIcon from '../../assets/icons/success.svg'
import errorIcon from '../../assets/icons/error.svg'
import offlineIcon from '../../assets/icons/offline.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IService } from '@/tools/types.ts'
import { useNavigate } from 'react-router-dom'

const Services = () => {
  const [services, setServices] = useState<IService[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API_URL}/services/`)
      .then(res => {
        setServices(res.data)
      })
      .catch(e => {
        if (e.response.status === 401) {
          localStorage.removeItem('user')
          navigate('/login')
        }
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
              <img src={
                service.status === 'online' ?
                  successIcon : service.status === 'error' ?
                    errorIcon : offlineIcon} alt="status"/>
            </li>
          )
        }
      </ul>
      <button className="btn btn-red" onClick={onReset}>Перезапуск системы</button>
    </div>
  )
}

export default Services