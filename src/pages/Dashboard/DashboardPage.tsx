import './dashboardPage.scss'
import TableSize from '@/components/TableSize/TableSize.tsx'
import Table from '@/components/Table/Table.tsx'

const DashboardPage = () => {
  return (
    <main>
      <TableSize />
      <Table />
    </main>
  )
}

export default DashboardPage