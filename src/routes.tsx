import DashboardPage from '@/pages/Dashboard/DashboardPage.tsx'
import MainPage from '@/pages/Main/MainPage.tsx'
import LoginPage from '@/pages/Login/LoginPage.tsx'
import ProtectedRoute from '@/components/ProtectedRote/ProtectedRoute.tsx'
import ServicesPage from '@/pages/Services/ServicesPage.tsx'
import ErrorsPage from '@/pages/Errors/ErrorsPage.tsx'
import SupportStatus from '@/pages/SupportStatus/SupportStatus.tsx'

export default [
  {
    route: '/',
    header: 'Добавления оборудования и параметров',
    sidebar: true,
    component: <ProtectedRoute><MainPage /></ProtectedRoute>,
  },
  {
    header: 'Cостояние служб',
    sidebar: true,
    component: <ProtectedRoute><SupportStatus /></ProtectedRoute>,
    route: '/support-status',
  },
  {
    header: 'Ошибки системы',
    sidebar: true,
    component: <ProtectedRoute><ErrorsPage /></ProtectedRoute>,
    route: '/errors',
  },
  {
    header: 'Аварий системы',
    sidebar: true,
    component: <ProtectedRoute><ServicesPage /></ProtectedRoute>,
    route: '/services',
  },
  {
    header: 'Рабочий стол администратора',
    route: '/Login',
    component: <LoginPage />,
  },
  {
    header: 'Киг шас',
    route: '/dashboard',
    component: <DashboardPage />
  }
]