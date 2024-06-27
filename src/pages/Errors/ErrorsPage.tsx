import Header from '@/components/Header/Header.tsx'
import Sidebar from '@/components/Sidebar/Sidebar.tsx'

const ErrorsPage = () => {
  return (
    <div>
      <Header title="Ошибки системы"/>
      <div className="content">
        <Sidebar/>
      </div>
    </div>
  )
}

export default ErrorsPage