import './supportStatus.scss'
import successIcon from '../../assets/icons/success.svg'
import errorIcon from '../../assets/icons/error.svg'

const items = [
  {
    title: 'Сервис работы лидара',
    status: true,
  },
  {
    title: 'Сервис работы лидара',
    status: true,
  },
  {
    title: 'Сервис работы лидара',
    status: false,
  },
  {
    title: 'Сервис работы лидара',
    status: true,
  },
]

const SupportStatus = () => {
  return (
    <div className="page-content support-status-page">
      <ul>
        {
          items.map((item, index) =>
            <li key={index}>
              <p>{item.title}</p>
              <img src={item.status ? successIcon : errorIcon} alt="status"/>
            </li>
          )
        }
      </ul>
      <button className="btn btn-red">Перезапуск системы</button>
    </div>
  )
}

export default SupportStatus