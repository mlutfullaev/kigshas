import './mainPage.scss'
import { useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import arrowTop from '@/assets/icons/arrowTop.svg'

const MainPage = () => {
  const [coefficient, setCoefficient] = useState('')
  const [density, setDensity] = useState('')
  const [topFormError, setTopFormError] = useState(false)
  const [topFormDisabled, setTopFormDisabled] = useState(true)

  const saveTopForm = () => {
    if (!coefficient.length || !density.length) {
      setTopFormError(true)
      return
    }

    if (topFormError) setTopFormError(false)

    setTopFormDisabled(true)
  }

  return (
    <div className="main-page page-content">
      <div className="main-top">
        <div>
          <p>Коэффициент разрыхления:</p>
          <BaseInput
            state={coefficient}
            setState={setCoefficient}
            error={topFormError}
            disabled={topFormDisabled}
          />
        </div>
        <div>
          <p>Плотность руды:</p>
          <BaseInput
            state={density}
            setState={setDensity}
            error={topFormError}
            disabled={topFormDisabled}
          />
        </div>
        <div>
          {
            topFormDisabled ?
              <button
                onClick={() => setTopFormDisabled(false)}
                className="btn btn-orange">Изменить параметры
              </button> :
              <button
                onClick={saveTopForm}
                className="btn btn-blue">Сохранить параметры
              </button>
          }

          <button className="btn btn-blue">
            Таблица моделей
            <img src={arrowTop} alt="arrow"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainPage