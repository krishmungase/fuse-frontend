import { Link, useParams } from 'react-router'

import { cn } from '@/lib/utils'
import { useChats } from '@/apis'

/**
 * Scrollable recent conversation list. Takes the flexible space between the
 * notebooks group and the pinned profile row. The active row is derived from
 * the `/chat/:id` route param, so it survives a refresh.
 */
const RecentChats = ({ onNavigate }) => {
  const { id } = useParams()
  const { chats, isLoading } = useChats()

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="px-3 pt-1 pb-1 text-[12px] font-normal text-chat-muted">
        Recents
      </p>

      <div className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto">
        {!isLoading && !chats.length ? (
          <p className="px-3 py-2 text-[13px] text-chat-muted">No chats yet</p>
        ) : null}

        <ul className="flex flex-col gap-px pb-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/chat/${chat.id}`}
                title={chat.title}
                onClick={() => onNavigate?.()}
                className={cn(
                  'block w-full cursor-pointer truncate rounded-full px-3 py-2 text-left text-[13px] transition-colors duration-150 outline-none',
                  chat.id === id
                    ? 'bg-chat-active text-chat-foreground'
                    : 'text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground focus-visible:bg-chat-hover focus-visible:text-chat-foreground'
                )}
              >
                {chat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RecentChats
