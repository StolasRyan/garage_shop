import { SidebarOverlayProps } from '../types/sidebar.types'

const SidebarOverlay = ({isOpen, onClose}:SidebarOverlayProps) => {
    if(!isOpen) return null
  return (
    <div 
    onClick={onClose}
    className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in'
    />
  )
}

export default SidebarOverlay