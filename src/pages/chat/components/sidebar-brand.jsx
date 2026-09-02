import { PanelLeftCloseIcon } from 'lucide-animated'

import { IconButton } from '@/components'

/** Sidebar header: product logo and the collapse control. */
const SidebarBrand = ({ onCollapse }) => {
  return (
    <div className="flex h-12 items-center justify-between gap-2 pr-1 pl-2">
      <img
        src="/fuse-logo.png"
        alt="Fuse AI"
        draggable={false}
        className="h-8 w-auto shrink-0 select-none"
      />

      <IconButton
        icon={PanelLeftCloseIcon}
        animated
        iconSize={20}
        label="Collapse sidebar"
        onClick={onCollapse}
        className="h-9 w-9"
      />
    </div>
  )
}

export default SidebarBrand
