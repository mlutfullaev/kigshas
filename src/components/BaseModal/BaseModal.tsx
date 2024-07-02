import './baseModal.scss'
import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

type BaseModalProps = {
  children: ReactNode[] | ReactNode
  active: boolean
  hide: () => void
}

const BaseModal = ({ children, active, hide }: BaseModalProps) => {

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [active])

  return createPortal(
    <div className={`modal${active ? ' active' : ''}`} onClick={() => hide()}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default BaseModal