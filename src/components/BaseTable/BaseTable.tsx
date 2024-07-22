import { ReactNode, useEffect, useRef, useState } from 'react'
import refresh from '@/assets/icons/refresh.svg'

type BaseTableProps = {
  className: string
  headers: (string | ReactNode)[]
  children: ReactNode[]
  loadMore?: () => void
  newData?: number
  resetTable?: () => void
}

const BaseTable = ({ className, headers, loadMore, children, newData, resetTable }: BaseTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [newItemsQuantity, setNewItemsQuantity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      if (scrollTop + clientHeight + 0.5 >= scrollHeight) {
        if (loadMore) {
          loadMore()
        }
      }

      if (scrollTop === 0 && newItemsQuantity) {
        setNewItemsQuantity(0)
      }
    }

    const scrollContainer = scrollRef.current as HTMLDivElement
    if (!scrollContainer) return
    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [loadMore, newItemsQuantity])

  useEffect(() => {
    if (newData && scrollRef.current) {
      const { scrollTop } = scrollRef.current

      if (scrollTop > 50) {
        setNewItemsQuantity(oldQuantity => ++oldQuantity)
      }
    }
  }, [newData])

  return (
    <div className={`${className} table scrollable`} ref={scrollRef}>
      <div className="table-content">
        <div ref={headerRef} className="table-column table-header">
          {
            headers.map(header => (
              <div className="table-header-item" key={header?.toString()}>
                {header}
              </div>
            ))
          }
        </div>
        {
          newItemsQuantity ?
            <div className="table-notification" style={headerRef.current ? { top: headerRef.current.clientHeight - 6 } : {}}>
              <p>{newItemsQuantity} новых уведомлений</p>
              <button className="btn btn-white" onClick={resetTable}>
                <img src={refresh} alt="refresh"/>
                Обновить таблицу
              </button>
            </div> : null
        }
        {children}
      </div>
    </div>
  )
}

export default BaseTable