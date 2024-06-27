import DashboardPage from '@/pages/Dashboard/DashboardPage.tsx'
import MainPage from '@/pages/Main/MainPage.tsx'

export default [
  {
    route: '/',
    component: <MainPage />,
  },
  {
    route: '/dashboard',
    component: <DashboardPage />
  }
]