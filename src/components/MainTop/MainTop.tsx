import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import arrowTop from '@/assets/icons/arrowTop.svg'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { DatePickerValue, ICoefficient } from '@/tools/types.ts'
import { useNavigate } from 'react-router-dom'
import './mainTop.scss'
import install from '@/assets/icons/install.svg'
import BaseModal from '@/components/BaseModal/BaseModal.tsx'
import DatePicker from 'react-date-picker'
import { exportExcel, formatEventsForExcel } from '@/tools/exportExcel.ts'
import { getTimeForBack } from '@/tools/helpers.ts'

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
  const [downloadModal, setDownloadModal] = useState(false)
  const [startDate, setStartDate] = useState<DatePickerValue>(null)
  const [endDate, setEndDate] = useState<DatePickerValue>(null)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    axios.get(`${API_URL}/coefficient/`)
      .then(res => {
        res.data.forEach((item: ICoefficient) => {
          if (item.name === 'density') setDensity(item.value)
          if (item.name === 'loosening') setLoosening(item.value)
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

  const onDownload = () => {
    if (!startDate || !endDate) {
      setErrorText('Введите нужную дату')
      return
    }

    const start = new Date(startDate.toString())
    const end = new Date(endDate.toString())

    if (start.getTime() > end.getTime()) {
      setErrorText('Начало не может быть позже конца')
      return
    }

    if (setErrorText) setErrorText('')

    axios.get(`${API_URL}/excel/`, {
      params: {
        start: getTimeForBack(start.getTime()),
        end: getTimeForBack(end.getTime())
      }
    })
      .then(async res => {
        const data = formatEventsForExcel(res.data.results)
        await exportExcel(data)
      })
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
              className="btn btn-green">
              Сохранить параметры
            </button>
        }

        <button className="btn btn-blue" onClick={() => setShowModelTable(oldValue => !oldValue)}>
          Таблица моделей
          <img src={arrowTop} alt="arrow" className={showModelTable ? 'rotate' : 'no-rotate'}/>
        </button>
        <button className="btn btn-green" onClick={() => setDownloadModal(true)}>
          <img src={install} alt=""/>
        </button>
      </div>
      <BaseModal active={downloadModal} hide={() => setDownloadModal(false)}>
        <h3 className="title green">Скачать Excel</h3>
        <div className="download-modal">
          <label>Начало</label>
          <label>Конец</label>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            value={endDate}
            onChange={setEndDate}
          />
        </div>
        {
          errorText ? <p className="error-message">{errorText}</p> : null
        }
        <div className="modal-buttons">
          <button className="btn btn-green" onClick={onDownload}>Скачать</button>
        </div>
      </BaseModal>
    </div>
  )
}

export default MainTop