import { ITableItem } from '@/assets/types.ts'

const TableItem = (props: ITableItem) => {
  const formatTime = (num: number) => {
    return num < 10 ? `0${num}` : num
  }
  const getTime = (time: number) => {
    const date = new Date(time)
    const day = formatTime(date.getDate())
    const month = formatTime(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = formatTime(date.getHours())
    const minutes = formatTime(date.getMinutes())
    const seconds = formatTime(date.getSeconds())
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="table-column">
      <div className="table-item">
        <p>{getTime(props.time)}</p>
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