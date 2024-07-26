import './supportStatus.scss'
import successIcon from '../../assets/icons/success.svg'
import errorIcon from '../../assets/icons/error.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IDescent } from '@/tools/types.ts'

const SupportStatus = () => {
  const [descents, setDescents] = useState<IDescent[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/services/`)
      .then(res => {
        setDescents(res.data)
      })
  }, [])

  const onReset = () => {
    axios.get(`${API_URL}/command`)
  }
  
  return (
    <div className="page-content support-status-page">
      <ul>
        {
          descents.map(descent =>
            <li key={descent.id}>
              <p>{descent.name}</p>
              <img src={descent.status === 'active' ? successIcon : errorIcon} alt="status"/>
            </li>
          )
        }
      </ul>
      <button className="btn btn-red" onClick={onReset}>Перезапуск системы</button>
    </div>
  )
}

export default SupportStatus