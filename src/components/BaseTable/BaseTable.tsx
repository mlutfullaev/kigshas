import { ReactNode } from 'react'

type BaseTableProps = {
  className: string,
  headers: (string | ReactNode)[],
  children: ReactNode[]
}

const BaseTable = ({ className, headers, children }: BaseTableProps) => {
  return (
    <div className={`${className} table scrollable`}>
      <div className="table-content">
        <div className="table-column table-header">
          {
            headers.map(header => (
              <div className="table-header-item">
                {header}
              </div>
            ))
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default BaseTable