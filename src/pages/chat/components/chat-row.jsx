import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ROW =
  'block w-full truncate rounded-full py-2 pr-9 pl-3 text-left text-[13px] transition-colors duration-150 outline-none'

const ChatRow = ({ chat, active, onNavigate, onRename, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(chat.title)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isEditing) return

    inputRef.current?.focus()
    inputRef.current?.select()
  }, [isEditing])

  const startEditing = () => {
    setDraft(chat.title)
    setIsEditing(true)
  }

  const commit = () => {
    const title = draft.trim()
    setIsEditing(false)

    if (!title || title === chat.title) return

    onRename?.(chat.id, title)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      commit()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        aria-label="Chat title"
        className={cn(
          ROW,
          'border border-chat-border bg-chat-elevated pr-3 text-chat-foreground'
        )}
      />
    )
  }

  return (
    <div className="group/row relative">
      <Link
        to={`/chat/${chat.id}`}
        title={chat.title}
        onClick={() => onNavigate?.()}
        className={cn(
          ROW,
          'cursor-pointer',
          active || menuOpen
            ? 'bg-chat-active text-chat-foreground'
            : 'text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground focus-visible:bg-chat-hover focus-visible:text-chat-foreground'
        )}
      >
        {chat.title}
      </Link>

      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`Options for ${chat.title}`}
            className={cn(
              'absolute top-1/2 right-1 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-chat-secondary transition-opacity outline-none hover:bg-chat-elevated hover:text-chat-foreground focus-visible:opacity-100',
              menuOpen
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
            onSelect={startEditing}
            className="cursor-pointer gap-3 rounded-xl px-3 py-2 text-[14px] text-chat-secondary focus:bg-chat-hover focus:text-chat-foreground [&_svg]:size-[16px]"
          >
            <Pencil />
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => onDelete?.(chat)}
            className="cursor-pointer gap-3 rounded-xl px-3 py-2 text-[14px] text-red-400 focus:bg-chat-hover focus:text-red-400 [&_svg]:size-[16px]"
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ChatRow
