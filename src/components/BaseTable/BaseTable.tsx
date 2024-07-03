import { ReactNode, useEffect, useRef } from 'react'

type BaseTableProps = {
  className: string,
  headers: (string | ReactNode)[],
  children: ReactNode[],
  loadMore?: () => void
}

const BaseTable = ({ className, headers, loadMore, children }: BaseTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        if (scrollTop + clientHeight >= scrollHeight) {
          if (loadMore) {
            loadMore()
          }
        }
      }
    }

    const scrollContainer = scrollRef.current as HTMLDivElement
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loadMore])
  return (
    <div className={`${className} table scrollable`} ref={scrollRef}>
      <div className="table-content">
        <div className="table-column table-header">
          {
            headers.map(header => (
              <div className="table-header-item" key={header?.toString()}>
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