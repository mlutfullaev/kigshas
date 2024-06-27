import './dashboardPage.scss'
import Table from '@/components/Table/Table.tsx'
import Select from 'react-select'
import { tableSizeOptions } from '@/assets/data.ts'
import { useState } from 'react'

const DashboardPage = () => {
  const [size, setSize] = useState(tableSizeOptions[0].value)
  return (
    <div className="dashboard-page">
      <div className="table-size">
        <p>Количество строк:</p>
        <Select
          value={{ value: size, label: size }}
          onChange={(e) => setSize(e ? e.value : tableSizeOptions[0].value)}
          options={tableSizeOptions}
          classNamePrefix="react-select"
          closeMenuOnScroll={true}
        />
      </div>
      <Table/>
    </div>
  )
}

export default DashboardPage