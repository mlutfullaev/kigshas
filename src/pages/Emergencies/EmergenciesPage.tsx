import Header from '@/components/Header/Header.tsx'
import Sidebar from '@/components/Sidebar/Sidebar.tsx'

const EmergenciesPage = () => {
  return (
    <div>
      <Header title="Cостояние служб"/>
      <div className="content">
        <Sidebar/>
      </div>
    </div>
  )
}

export default EmergenciesPage