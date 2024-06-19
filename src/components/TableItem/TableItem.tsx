import { ITableItem } from '@/assets/types.ts'

const TableItem = (props: ITableItem) => {
  return (
    <div className="table-column">
      <div className="table-item">
        <p>{new Date(props.time).toLocaleDateString()}</p>
      </div>
      <div className="table-item">
        <p>{props.clearance}</p>
      </div>
      <div className="table-item">
        <p>{props.shas || 'Не удалось считать метку'}</p>
      </div>
      <div className="table-item">
        <p>{props.tonPercent || '-'}</p>
      </div>
      <div className="table-item">
        <p>{props.weight || '-'}</p>
      </div>
      <div className="table-item">
        <p>{props.stickingPercent || '-'}</p>
      </div>
    </div>
  )
}

export default TableItem