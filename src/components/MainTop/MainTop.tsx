import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import arrowTop from '@/assets/icons/arrowTop.svg'
import axios from 'axios'
import { API_URL } from '@/main.tsx'

type MainTopProps = {
  showModelTable: boolean
  setShowModelTable: Dispatch<SetStateAction<boolean>>
}

const MainTop = ({ showModelTable, setShowModelTable }: MainTopProps) => {
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
        const [density, loosening] = res.data
        setInitialCoefficient({
          density: density.value,
          loosening: loosening.value
        })
        setLoosening(loosening.value)
        setDensity(density.value)
      })
  }, [])

  const saveTopForm = () => {
    if (!loosening.length || !density.length) {
      setFormError(true)
      return
    }

    if (initialCoefficient.density !== density) {
      axios.put(`${API_URL}/coefficient/1/`, {
        name: 'density',
        value: Number(density)
      })
        .then(() => {
          setInitialCoefficient(value => ({
            density,
            loosening: value.loosening
          }))
        })
    }
    if (initialCoefficient.loosening !== loosening) {
      axios.put(`${API_URL}/coefficient/1/`, {
        name: 'loosening',
        value: Number(loosening)
      })
        .then(() => {
          setInitialCoefficient(value => ({
            density: value.density,
            loosening
          }))
        })
    }

    if (formError) setFormError(false)

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
      </div>
      <div>
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