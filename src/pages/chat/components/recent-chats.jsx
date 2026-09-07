import { useChats } from '@/apis'
import ChatRow from './chat-row'
import DeleteChatDialog from './delete-chat-dialog'
import useChatActions from '../hooks/use-chat-actions'

const RecentChats = ({ onNavigate }) => {
  const { chats, isLoading } = useChats()

  const {
    activeChatId,
    rename,
    chatPendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
  } = useChatActions()

  const isEmpty = !isLoading && !chats.length

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="px-3 pt-1 pb-1 text-[12px] font-normal text-chat-muted">
        Recents
      </p>

      <div className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto">
        {isEmpty ? (
          <p className="px-3 py-2 text-[13px] text-chat-muted">No chats yet</p>
        ) : null}

        <ul className="flex flex-col gap-px pb-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <ChatRow
                chat={chat}
                isActive={chat.id === activeChatId}
                onNavigate={onNavigate}
                onRename={rename}
                onDelete={requestDelete}
              />
            </li>
          ))}
        </ul>
      </div>

      <DeleteChatDialog
        chat={chatPendingDelete}
        isDeleting={isDeleting}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default RecentChats
