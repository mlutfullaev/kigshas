import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import routes from '@/routes.tsx'

const Sidebar = () => {
  const location = useLocation()

  const sidebarItems = routes.filter(route => route.sidebar)

  return (
    <aside className="sidebar">
      {
        sidebarItems.map(item => (
          <Link
            key={item.route}
            to={item.route}
            className={location.pathname === item.route ? 'active' : ''}
          >
            {item.header}
          </Link>
        ))
      }
    </aside>
  )
}

export default Sidebar