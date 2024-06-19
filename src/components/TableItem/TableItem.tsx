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
      <div className={`table-item${!props.shas ? ' error' : ''}`}>
        <p>{props.shas || 'Не удалось считать метку'}</p>
      </div>
      <div className={`table-item${props.tonPercent && props.tonPercent < 90 ? ' error' : ''}`}>
        <p>{props.tonPercent ? props.tonPercent + '%' : '-'}</p>
      </div>
      <div className="table-item">
        <p>{props.weight || '-'}</p>
      </div>
      <div className={`table-item${props.stickingPercent && props.stickingPercent > 10 ? ' error' : ''}`}>
        <p>{props.stickingPercent ? props.stickingPercent + '%' : '-'}</p>
      </div>
    </div>
  )
}

export default TableItem