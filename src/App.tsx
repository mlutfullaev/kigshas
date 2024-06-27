import { Route, Routes } from 'react-router-dom'
import routes from '@/routes.tsx'

function App() {
  return (
    <>
      <Routes>
        {
          routes.map(route =>
            <Route
              path={route.route}
              element={route.component}
              key={route.route}
            />
          )
        }
      </Routes>
    </>
  )
}

export default App
