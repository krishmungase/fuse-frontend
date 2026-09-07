import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const MENU_ITEM =
  'cursor-pointer gap-3 rounded-xl px-3 py-2 text-[14px] focus:bg-chat-hover [&_svg]:size-4'

const TRIGGER =
  'absolute top-1/2 right-1 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-chat-secondary transition-opacity outline-none hover:bg-chat-elevated hover:text-chat-foreground focus-visible:opacity-100'

const ChatRowMenu = ({
  chatTitle,
  isOpen,
  onOpenChange,
  onRename,
  onDelete,
}) => (
  <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        aria-label={`Options for ${chatTitle}`}
        className={cn(
          TRIGGER,
          isOpen
            ? 'opacity-100'
            : 'opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100'
        )}
      >
        <MoreVertical className="size-4" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="start"
      sideOffset={6}
      className="min-w-[168px] rounded-2xl border-chat-border bg-chat-elevated p-1.5 text-chat-foreground shadow-lg"
    >
      <DropdownMenuItem
        onSelect={onRename}
        className={cn(
          MENU_ITEM,
          'text-chat-secondary focus:text-chat-foreground'
        )}
      >
        <Pencil />
        Rename
      </DropdownMenuItem>

      <DropdownMenuItem
        onSelect={onDelete}
        className={cn(MENU_ITEM, 'text-red-400 focus:text-red-400')}
      >
        <Trash2 />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default ChatRowMenu
