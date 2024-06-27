import Header from '@/components/Header/Header.tsx'
import Sidebar from '@/components/Sidebar/Sidebar.tsx'

const MainPage = () => {
  return (
    <div>
      <Header title="Добавления оборудования и параметров" />
      <div className="content">
        <Sidebar />
      </div>
    </div>
  )
}

export default MainPage