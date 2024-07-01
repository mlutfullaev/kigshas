import './mainPage.scss'
import { useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import arrowTop from '@/assets/icons/arrowTop.svg'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'

const modelHeaders = [
  'Модель ШАС',
  'Масса плановая (КИГ пл.)',
  'КИГ план, в %',
  'Масса паспортная ( КИГ пасп)'
]

const MainPage = () => {
  const [coefficient, setCoefficient] = useState('')
  const [density, setDensity] = useState('')
  const [topFormError, setTopFormError] = useState(false)
  const [topFormDisabled, setTopFormDisabled] = useState(true)
  const [showModelTable, setShowModelTable] = useState(false)


  const mainHeaders = [
    '№ ШАС',
    'Метка',
    'Модель',
    <button className="btn btn-green">Cоздать новый ШАС</button>
  ]

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
                className="btn btn-green">Сохранить параметры
              </button>
          }

          <button className="btn btn-blue" onClick={() => setShowModelTable(oldValue => !oldValue)}>
            Таблица моделей
            <img src={arrowTop} alt="arrow" className={showModelTable ? 'rotate' : 'no-rotate'}/>
          </button>
        </div>
      </div>
      {
        showModelTable && <BaseTable className="main-model-table" headers={modelHeaders}>
          {
            new Array(10).fill(0).map(() => (
              <div className="table-column">
                <div className="table-item">
                  <p>CAT AD30 big</p>
                </div>
                <div className="table-item">
                  <p>24</p>
                </div>
                <div className="table-item">
                  <p>24</p>
                </div>
                <div className="table-item">
                  <p>24</p>
                </div>
              </div>
            ))
          }
        </BaseTable>
      }
      <BaseTable className="main-table" headers={mainHeaders}>
        {
          new Array(10).fill(0).map(() => (
            <div className="table-column">
              <div className="table-item">
                <p>347</p>
              </div>
              <div className="table-item">
                <p>000000000000000000000390</p>
              </div>
              <div className="table-item">
                <p>Модель</p>
              </div>
              <div className="table-item">
                <button className="btn-orange">Изменить</button>
              </div>
              <div className="table-item">
                <button className="btn-red">Удалить</button>
              </div>
            </div>
          ))
        }
      </BaseTable>
    </div>
  )
}

export default MainPage