import './mainPage.scss'
import { useEffect, useState } from 'react'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import BaseTable from '@/components/BaseTable/BaseTable.tsx'
import BaseModal from '@/components/BaseModal/BaseModal.tsx'
import BaseSelect from '@/components/BaseSelect/BaseSelect.tsx'
import axios from 'axios'
import { API_URL } from '@/main.tsx'
import { IModel, IVehicle } from '@/assets/types.ts'
import MainTop from '@/components/MainTop/MainTop.tsx'

const modelHeaders = [
  'Модель ШАС',
  'Масса плановая (КИГ пл.)',
  'КИГ план, в %',
  'Масса паспортная ( КИГ пасп)'
]

const numberOptions = [
  {
    value: '123',
    label: '123',
  },
  {
    value: '000000000000000000000310',
    label: '000000000000000000000310',
  },
  {
    value: '000000000000000000000320',
    label: '000000000000000000000320',
  },
  {
    value: '000000000000000000000330',
    label: '000000000000000000000330',
  },
  {
    value: '000000000000000000000340',
    label: '000000000000000000000340',
  },
  {
    value: '000000000000000000000350',
    label: '000000000000000000000350',
  }
]

const markOptions = [
  {
    value: '0000000310',
    label: '0000000310',
  },
  {
    value: '0000000320',
    label: '0000000320',
  },
  {
    value: '0000000330',
    label: '0000000330',
  },
  {
    value: '0000000340',
    label: '0000000340',
  },
  {
    value: '0000000350',
    label: '0000000350',
  }
]

const modelOptions = [
  {
    value: 'Model',
    label: 'Model',
  },
  {
    value: 'Model1',
    label: 'Model1',
  },
  {
    value: 'Model2',
    label: 'Model2',
  },
  {
    value: 'Model3',
    label: 'Model3',
  },
]

const MainPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [models, setModels] = useState<IModel[]>([])
  const [showModelTable, setShowModelTable] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [number, setNumber] = useState('')
  const [mark, setMark] = useState('')
  const [model, setModel] = useState('')
  const [activeItem, setActiveItem] = useState(0)

  const mainHeaders = [
    '№ ШАС',
    'Метка',
    'Модель',
    <button className="btn btn-green" onClick={() => setCreateModal(true)}>Cоздать новый ШАС</button>
  ]

  useEffect(() => {
    axios.get(`${API_URL}/vehicles`)
      .then(res => {
        setVehicles(res.data)
      })
    axios.get(`${API_URL}/model/`)
      .then(res => {
        setModels(res.data)
      })
  }, [])

  const onCreateSHAS = () => {
    setCreateModal(false)
  }

  const createNumberOption = (value: string) => {
    if (numberOptions.some(obj => obj.value === value)) return
    setNumber(value)
  }
  const createMarkOption = (value: string) => {
    if (markOptions.some(obj => obj.value === value)) return
    setMark(value)
  }

  const onEditSHAS = () => {
    console.log(activeItem)
    setEditModal(false)
  }

  return (
    <div className="main-page page-content">
      <MainTop showModelTable={showModelTable} setShowModelTable={setShowModelTable} />
      {
        showModelTable && <BaseTable className="main-model-table" headers={modelHeaders}>
          {
            models.map(modelItem => (
              <div className="table-column">
                <div className="table-item">
                  <p>{modelItem.name}</p>
                </div>
                <div className="table-item">
                  <p>{modelItem.weight_planned}</p>
                </div>
                <div className="table-item">
                  <p>{modelItem.kig_plan}</p>
                </div>
                <div className="table-item">
                  <p>{modelItem.weight_passport}</p>
                </div>
              </div>
            ))
          }
        </BaseTable>
      }
      <BaseTable className="main-table" headers={mainHeaders}>
        {
          vehicles.map(vehicle => (
            <div className="table-column">
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
                <button className="btn-orange" onClick={() => {
                  setEditModal(true)
                  setActiveItem(vehicle.id)
                }}>Изменить</button>
              </div>
              <div className="table-item">
                <button className="btn-red" onClick={() => {
                  setActiveItem(vehicle.id)
                  setDeleteModal(true)
                }}>Удалить</button>
              </div>
            </div>
          ))
        }
      </BaseTable>
      <BaseModal active={deleteModal} hide={() => setDeleteModal(false)}>
        <h3 className="title green">Вы действительно хотите удалить ШАС?</h3>
        <div className="modal-buttons">
          <button className="btn btn-red">Да</button>
          <button className="btn btn-green">Отмена</button>
        </div>
      </BaseModal>
      <BaseModal active={createModal} hide={() => setCreateModal(false)}>
        <h3 className="title green">Добавить новый ШАС</h3>
        <label className="base-label">
          Номер ШАС
        </label>
        <BaseSelect
          state={number}
          setState={setNumber}
          onCreate={createNumberOption}
          options={numberOptions}
        />
        <label className="base-label">
          Метка
        </label>
        <BaseSelect
          state={mark}
          setState={setMark}
          onCreate={createMarkOption}
          options={markOptions}
        />
        <label className="base-label">
          Модель
        </label>
        <BaseSelect
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
        <BaseInput
          state={number}
          setState={setNumber}
          disabled={true}
        />
        <label className="base-label">
          Метка
        </label>
        <BaseSelect
          state={mark}
          setState={setMark}
          onCreate={createMarkOption}
          options={markOptions}
        />
        <label className="base-label">
          Модель
        </label>
        <BaseInput
          state={model}
          setState={setModel}
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