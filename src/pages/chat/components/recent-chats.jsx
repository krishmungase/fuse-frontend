import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useChats, useDeleteChat, useRenameChat } from '@/apis'
import { NEW_CHAT_PATH } from '@/constants'
import ChatRow from './chat-row'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const RecentChats = ({ onNavigate }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { chats, isLoading } = useChats()
  const [pendingDelete, setPendingDelete] = useState(null)

  const { renameChat } = useRenameChat()
  const { deleteChat, isDeleting } = useDeleteChat({
    onSuccess: (deletedId) => {
      setPendingDelete(null)
      if (deletedId === id) navigate(NEW_CHAT_PATH, { replace: true })
    },
  })

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
              <ChatRow
                chat={chat}
                active={chat.id === id}
                onNavigate={onNavigate}
                onRename={(chatId, title) => renameChat({ id: chatId, title })}
                onDelete={setPendingDelete}
              />
            </li>
          ))}
        </ul>
      </div>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent className="rounded-3xl border-chat-border bg-chat-elevated text-chat-foreground">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription className="text-chat-secondary">
              “{pendingDelete?.title}” and every message in it will be deleted.
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-chat-border bg-transparent text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault()
                deleteChat({ id: pendingDelete.id })
              }}
              className="rounded-full bg-red-500 text-white hover:bg-red-500/90"
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RecentChats
