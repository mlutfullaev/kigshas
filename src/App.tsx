import { Route, Routes, useNavigate } from 'react-router-dom'
import routes from '@/routes.tsx'
import Header from '@/components/Header/Header.tsx'
import Sidebar from '@/components/Sidebar/Sidebar.tsx'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      e => {
        if (e.response.data.detail === 'Invalid username/password.') {
          localStorage.removeItem('user')
          navigate('/login')
        }

        return Promise.reject(e)
      }
    )
  }, [])
  
  return (
    <Routes>
      {
        routes.map(route =>
          <Route
            path={route.route}
            key={route.route}
            element={
              <>
                <Header title={route.header} />
                {
                  route.sidebar ?
                    <div className="content">
                      <Sidebar />
                      {route.component}
                    </div>
                    :
                    route.component
                }
              </>
            }
          />
        )
      }
    </Routes>
  )
}

export default App
