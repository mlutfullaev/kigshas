import './table.scss'
import TableItem from '@/components/TableItem/TableItem.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store.ts'

const Table = () => {
  const tableData = useSelector((state: RootState) => state.table.table)

  return (
    <div className="table">
      <div className="table-column table-header">
        <div className="table-header-item">
          <p>Время</p>
        </div>
        <div className="table-header-item">
          <p>№ Рудоспуска</p>
        </div>
        <div className="table-header-item">
          <p>№ ШАС</p>
        </div>
        <div className="table-header-item">
          <p>КИГ % тон</p>
        </div>
        <div className="table-header-item">
          <p>Масса тонн</p>
        </div>
        <div className="table-header-item">
          <p>% Налипания в объеме</p>
        </div>
      </div>
      <div className="table-content scrollbar">
        {
          tableData.map(item => <TableItem {...item} key={item.id} />)
        }
      </div>
    </div>
  )
}

export default Table