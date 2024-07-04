import { Route, Routes } from 'react-router-dom'
import routes from '@/routes.tsx'
import Header from '@/components/Header/Header.tsx'
import Sidebar from '@/components/Sidebar/Sidebar.tsx'

function App() {
  
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
