import './mainPage.scss'
import TableSize from '@/components/TableSize/TableSize.tsx'
import Table from '@/components/Table/Table.tsx'

const MainPage = () => {
  return (
    <main>
      <TableSize />
      <Table />
    </main>
  )
}

export default MainPage