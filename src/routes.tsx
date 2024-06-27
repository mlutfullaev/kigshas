import DashboardPage from '@/pages/Dashboard/DashboardPage.tsx'
import MainPage from '@/pages/Main/MainPage.tsx'
import LoginPage from '@/pages/Login/LoginPage.tsx'
import ProtectedRoute from '@/components/ProtectedRote/ProtectedRoute.tsx'
import ServicesPage from '@/pages/Services/ServicesPage.tsx'
import ErrorsPage from '@/pages/Errors/ErrorsPage.tsx'
import EmergenciesPage from '@/pages/Emergencies/EmergenciesPage.tsx'

export default [
  {
    route: '/',
    component: <ProtectedRoute><MainPage /></ProtectedRoute>,
  },
  {
    component: <ProtectedRoute><ServicesPage /></ProtectedRoute>,
    route: '/services',
  },
  {
    component: <ProtectedRoute><ErrorsPage /></ProtectedRoute>,
    route: '/errors',
  },
  {
    component: <ProtectedRoute><EmergenciesPage /></ProtectedRoute>,
    route: '/emergencies',
  },
  {
    route: '/Login',
    component: <LoginPage />,
  },
  {
    route: '/dashboard',
    component: <DashboardPage />
  }
]