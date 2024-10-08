import DashboardPage from '@/pages/Dashboard/DashboardPage.tsx'
import MainPage from '@/pages/Main/MainPage.tsx'
import LoginPage from '@/pages/Login/LoginPage.tsx'
import ProtectedRoute from '@/components/ProtectedRote/ProtectedRoute.tsx'
import ErrorsPage from '@/pages/Errors/ErrorsPage.tsx'
import Services from '@/pages/Services/Services.tsx'
import FaultsPage from '@/pages/Faults/FaultsPage.tsx'

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
    component: <ProtectedRoute><Services /></ProtectedRoute>,
    route: '/services',
  },
  {
    header: 'Ошибки системы',
    sidebar: true,
    component: <ProtectedRoute><ErrorsPage /></ProtectedRoute>,
    route: '/warnings',
  },
  {
    header: 'Аварии системы',
    sidebar: true,
    component: <ProtectedRoute><FaultsPage /></ProtectedRoute>,
    route: '/faults',
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