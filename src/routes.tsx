import DashboardPage from '@/pages/Dashboard/DashboardPage.tsx'
import MainPage from '@/pages/Main/MainPage.tsx'
import LoginPage from '@/pages/Login/LoginPage.tsx'

export default [
  {
    route: '/',
    component: <MainPage />,
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