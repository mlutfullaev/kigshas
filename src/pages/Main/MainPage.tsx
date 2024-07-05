import './mainPage.scss'
import { useEffect, useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'
import BaseModal from '@/components/BaseModal/BaseModal.tsx'
import BaseSelect from '@/components/BaseSelect/BaseSelect.tsx'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IModel, IRfid, IVehicle, SelectType } from '@/tools/types.ts'
import MainTop from '@/components/MainTop/MainTop.tsx'
import { useNavigate } from 'react-router-dom'

const modelHeaders = [
  'Модель ШАС',
  'Масса плановая (КИГ пл.)',
  'КИГ план, в %',
  'Масса паспортная ( КИГ пасп)'
]

const MainPage = () => {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [models, setModels] = useState<IModel[]>([])
  const [showModelTable, setShowModelTable] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [activeItem, setActiveItem] = useState<null | IVehicle>(null)
  const [formError, setFormError] = useState(false)
  
  const [number, setNumber] = useState('')
  const [mark, setMark] = useState<SelectType | null>(null)
  const [model, setModel] = useState<SelectType | null>(null)
  const [markOptions, setMarkOptions] = useState<SelectType[]>([])
  const [modelOptions, setModelOptions] = useState<SelectType[]>([])

  const mainHeaders = [
    '№ ШАС',
    'Метка',
    'Модель',
    <button className="btn btn-green" onClick={() => setCreateModal(true)}>Cоздать новый ШАС</button>
  ]

  const getData = () => {
    axios.get(`${API_URL}/vehicles`)
      .then(res => {
        setVehicles(res.data)
      })
      .catch(e => {
        if (e.response.status === 401) {
          localStorage.removeItem('user')
          navigate('/login')
        }
      })
    axios.get(`${API_URL}/models/`)
      .then(res => {
        setModels(res.data)
        setModelOptions(res.data.map((item: IModel) => ({
          value: item.id.toString(),
          label: item.name
        }))
        )
      })
      .catch(e => {
        if (e.response.status === 401) {
          localStorage.removeItem('user')
          navigate('/login')
        }
      })
  }

  useEffect(() => {
    getData()
    axios.get(`${API_URL}/rfid/`)
      .then(res => {
        setMarkOptions(res.data.map((item: IRfid) => ({
          value: item.id.toString(),
          label: item.rfid
        })))
      })
  }, [])

  useEffect(() => {
    if (!createModal && !editModal && !deleteModal) {
      setActiveItem(null)
      setFormError(false)
      setNumber('')
      setMark(null)
      setModel(null)
    }
  }, [createModal, editModal, deleteModal])

  const createMarkOption = (value: string) => {
    if (markOptions.some(obj => obj.value === value)) return
    axios.post(`${API_URL}/rfid/`, {
      rfid: value
    })
      .then(res => {
        setMarkOptions(oldOptions => [...oldOptions, {
          value: res.data.id.toString(),
          label: res.data.rfid
        }])
        setMark({
          value: res.data.id.toString(),
          label: res.data.rfid
        })
      })
  }

  const openEditModal = (vehicle: IVehicle) => {
    setActiveItem(vehicle)
    setNumber(vehicle.number)
    setMark({
      value: vehicle.rfid.id.toString(),
      label: vehicle.rfid.rfid
    })
    setModel({
      value: vehicle.model.id.toString(),
      label: vehicle.model.name
    })
    setEditModal(true)
  }

  const onEditSHAS = () => {
    if (!mark?.value || !model?.value || !number) {
      setFormError(true)
      return
    }

    if (formError) setFormError(false)

    if (activeItem?.rfid.id === Number(mark.value)) {
      console.log(2)
      setEditModal(false)
      return
    }

    axios.put(`${API_URL}/vehicles/${activeItem?.id}/`, {
      number,
      rfid: mark.value,
      model: model.value
    })
      .then(() => {
        setEditModal(false)
      })
  }

  const onCreateSHAS = () => {
    if (!number.length || !mark?.value || !model?.value) {
      setFormError(true)
      return
    }

    if (formError) setFormError(false)

    const data = {
      number,
      rfid: Number(mark?.value),
      model: Number(model?.value)
    }

    axios.post(`${API_URL}/vehicle/`, data)
      .then(() => {
        setCreateModal(false)
      })
  }

  const onDeleteVehicle = () => {
    if (activeItem === null) return
    axios.delete(`${API_URL}/vehicles/${activeItem.id}/`)
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== activeItem.id))
        setActiveItem(null)
        setDeleteModal(false)
      })
  }

  return (
    <div className="main-page page-content">
      <MainTop showModelTable={showModelTable} setShowModelTable={setShowModelTable} getData={getData}/>
      {
        showModelTable && <BaseTable className="main-model-table" headers={modelHeaders}>
          {
            models.map(modelItem => (
              <div className="table-column" key={modelItem.id}>
                <div className="table-item">
                  <p>{modelItem.name}</p>
                </div>
                <div className="table-item">
                  <p>{Number(modelItem.weight_planned).toFixed()}</p>
                </div>
                <div className="table-item">
                  <p>{Number(modelItem.kig_plan).toFixed()}</p>
                </div>
                <div className="table-item">
                  <p>{Number(modelItem.weight_passport).toFixed()}</p>
                </div>
              </div>
            ))
          }
        </BaseTable>
      }
      <BaseTable className="main-table" headers={mainHeaders}>
        {
          vehicles.map(vehicle => (
            <div className="table-column" key={vehicle.id}>
              <div className="table-item">
                <p>{
                  vehicle.number
                }</p>
              </div>
              <div className="table-item">
                <p>{vehicle.rfid.rfid}</p>
              </div>
              <div className="table-item">
                <p>{vehicle.model.name}</p>
              </div>
              <div className="table-item">
                <button className="btn-orange" onClick={() => openEditModal(vehicle)}>Изменить
                </button>
              </div>
              <div className="table-item">
                <button className="btn-red" onClick={() => {
                  setActiveItem(vehicle)
                  setDeleteModal(true)
                }}>Удалить
                </button>
              </div>
            </div>
          ))
        }
      </BaseTable>
      <BaseModal active={deleteModal} hide={() => setDeleteModal(false)}>
        <h3 className="title green">Вы действительно хотите удалить ШАС?</h3>
        <div className="modal-buttons">
          <button className="btn btn-red" onClick={onDeleteVehicle}>Да</button>
          <button className="btn btn-green" onClick={() => {
            setActiveItem(null)
            setDeleteModal(false)
          }}>Отмена
          </button>
        </div>
      </BaseModal>
      <BaseModal active={createModal} hide={() => setCreateModal(false)}>
        <h3 className="title green">Добавить новый ШАС</h3>
        <label className="base-label">
          Номер ШАС
        </label>
        <BaseInput
          error={formError}
          state={number}
          setState={setNumber}
        />
        <label className="base-label">
          Метка
        </label>
        <BaseSelect
          error={formError}
          state={mark}
          setState={setMark}
          onCreate={createMarkOption}
          options={markOptions}
        />
        <label className="base-label">
          Модель
        </label>
        <BaseSelect
          error={formError}
          state={model}
          setState={setModel}
          options={modelOptions}
        />
        <div className="modal-buttons">
          <button className="btn btn-green" onClick={onCreateSHAS}>Добавить ШАС</button>
        </div>
      </BaseModal>
      <BaseModal active={editModal} hide={() => setEditModal(false)}>
        <h3 className="title orange">Изменить ШАС</h3>
        <label className="base-label">
          Номер ШАС
        </label>
        <input
          type="text"
          className="base-input"
          value={number}
          disabled={true}
        />
        <label className="base-label">
          Метка
        </label>
        <BaseSelect
          error={formError}
          state={mark}
          setState={setMark}
          onCreate={createMarkOption}
          options={markOptions}
        />
        <label className="base-label">
          Модель
        </label>
        <input
          type="text"
          className="base-input"
          value={model?.label}
          disabled={true}
        />
        <div className="modal-buttons">
          <button className="btn btn-orange" onClick={onEditSHAS}>Изменить ШАС</button>
        </div>
      </BaseModal>
    </div>
  )
}

export default MainPage