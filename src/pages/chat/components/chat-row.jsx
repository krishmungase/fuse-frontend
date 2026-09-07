import { useState } from 'react'
import { Link } from 'react-router'

import { cn } from '@/lib/utils'
import ChatRowMenu from './chat-row-menu'
import ChatTitleInput from './chat-title-input'

const ROW =
  'block w-full truncate rounded-full py-2 pr-9 pl-3 text-left text-[13px] transition-colors duration-150 outline-none'

const ChatRow = ({ chat, isActive, onNavigate, onRename, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const stopEditing = () => setIsEditing(false)

  const handleRename = (title) => {
    stopEditing()
    onRename(chat.id, title)
  }

  if (isEditing) {
    return (
      <ChatTitleInput
        title={chat.title}
        onSubmit={handleRename}
        onCancel={stopEditing}
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
        onClick={onNavigate}
        className={cn(
          ROW,
          'cursor-pointer',
          isActive || isMenuOpen
            ? 'bg-chat-active text-chat-foreground'
            : 'text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground focus-visible:bg-chat-hover focus-visible:text-chat-foreground'
        )}
      >
        {chat.title}
      </Link>

      <ChatRowMenu
        chatTitle={chat.title}
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        onRename={() => setIsEditing(true)}
        onDelete={() => onDelete(chat)}
      />
    </div>
  )
}

export default ChatRow
