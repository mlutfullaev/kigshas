import Header from '@/components/Header/Header.tsx'
import { Route, Routes } from 'react-router-dom'
import routes from '@/routes.tsx'

function App() {

  return (
    <>
      <Header />
      <Routes>
        {
          routes.map(route => <Route path={route.route} element={route.component} />)
        }
      </Routes>
    </>
  )
}

export default App
