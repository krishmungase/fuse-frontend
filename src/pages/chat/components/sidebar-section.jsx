import { cn } from '@/lib/utils'

const SidebarSection = ({ title, className, children }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <p className="px-3 pt-1 pb-1 text-[12px] font-normal text-chat-muted">
        {title}
      </p>
      {children}
    </div>
  )
}

export default SidebarSection
