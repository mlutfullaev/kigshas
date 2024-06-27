import Header from '@/components/Header/Header.tsx'
import Sidebar from '@/components/Sidebar/Sidebar.tsx'

const ServicesPage = () => {
  return (
    <div>
      <Header title="Аварий системы"/>
      <div className="content">
        <Sidebar/>
      </div>
    </div>
  )
}

export default ServicesPage