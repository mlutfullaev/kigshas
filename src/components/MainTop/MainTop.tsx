import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import arrowTop from '@/assets/icons/arrowTop.svg'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { ICoefficient } from '@/tools/types.ts'
import { useNavigate } from 'react-router-dom'
import './mainTop.scss'

type MainTopProps = {
  showModelTable: boolean
  setShowModelTable: Dispatch<SetStateAction<boolean>>
  getData: () => void
}

const MainTop = ({ showModelTable, setShowModelTable, getData }: MainTopProps) => {
  const navigate = useNavigate()
  const [initialCoefficient, setInitialCoefficient] = useState(
    {
      density: '',
      loosening: ''
    }
  )
  const [loosening, setLoosening] = useState('')
  const [density, setDensity] = useState('')
  const [formError, setFormError] = useState(false)
  const [formDisabled, setFormDisabled] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/coefficient/`)
      .then(res => {
        res.data.forEach((item: ICoefficient) => {
          if (item.name === 'density') setDensity(Number(item.value).toFixed())
          if (item.name === 'loosening') setLoosening(Number(item.value).toFixed())
        })
        setInitialCoefficient({
          density: density,
          loosening: loosening
        })
      })
      .catch(e => {
        if (e.response.status === 401) {
          localStorage.removeItem('user')
          navigate('/login')
        }
      })
  }, [])

  const saveTopForm = async () => {
    if (!loosening.length || !density.length) {
      setFormError(true)
      return
    }

    if (formError) setFormError(false)

    let changed = false

    if (initialCoefficient.density !== density) {
      await axios.put(`${API_URL}/coefficient/1/`, {
        name: 'density',
        value: Number(density)
      })
        .then(() => {
          changed = true
          setInitialCoefficient(value => ({
            density,
            loosening: value.loosening
          }))
        })
        .catch(e => {
          if (e.response.status === 401) {
            localStorage.removeItem('user')
            navigate('/login')
          }
        })
    }
    if (initialCoefficient.loosening !== loosening) {
      await axios.put(`${API_URL}/coefficient/2/`, {
        name: 'loosening',
        value: Number(loosening)
      })
        .then(() => {
          changed = true
          setInitialCoefficient(value => ({
            density: value.density,
            loosening
          }))
        })
        .catch(e => {
          if (e.response.status === 401) {
            localStorage.removeItem('user')
            navigate('/login')
          }
        })
    }
    if (changed) {
      getData()
    }

    setFormDisabled(true)
  }
  
  return (
    <div className="main-top">
      <div>
        <p>Коэффициент разрыхления:</p>
        <BaseInput
          type="number"
          state={loosening}
          setState={setLoosening}
          error={formError}
          disabled={formDisabled}
        />
        <p>Плотность руды:</p>
        <BaseInput
          type="number"
          state={density}
          setState={setDensity}
          error={formError}
          disabled={formDisabled}
        />
      </div>
      <div>
        {
          formDisabled ?
            <button
              onClick={() => setFormDisabled(false)}
              className="btn btn-orange">Изменить параметры
            </button> :
            <button
              onClick={saveTopForm}
              className="btn btn-green">Сохранить параметры
            </button>
        }

        <button className="btn btn-blue" onClick={() => setShowModelTable(oldValue => !oldValue)}>
          Таблица моделей
          <img src={arrowTop} alt="arrow" className={showModelTable ? 'rotate' : 'no-rotate'}/>
        </button>
      </div>
    </div>
  )
}

export default MainTop