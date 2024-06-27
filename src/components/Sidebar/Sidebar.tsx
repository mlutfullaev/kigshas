import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const sidebarItems = [
    {
      title: 'Добавления оборудования и параметров',
      route: '/',
    },
    {
      title: 'Cостояние служб',
      route: '/services',
    },
    {
      title: 'Ошибки системы',
      route: '/errors',
    },
    {
      title: 'Аварий системы',
      route: '/emergencies',
    }
  ]

  return (
    <aside className="sidebar">
      {
        sidebarItems.map(item => (
          <Link
            key={item.route}
            to={item.route}
            className={location.pathname === item.route ? 'active' : ''}
          >
            {item.title}
          </Link>
        ))
      }
    </aside>
  )
}

export default Sidebar