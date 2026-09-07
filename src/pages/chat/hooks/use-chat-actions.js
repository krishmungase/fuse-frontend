import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useDeleteChat, useRenameChat } from '@/apis'
import { NEW_CHAT_PATH } from '@/constants'

const useChatActions = () => {
  const { id: activeChatId } = useParams()
  const navigate = useNavigate()

  const [chatPendingDelete, setChatPendingDelete] = useState(null)

  const { renameChat } = useRenameChat()
  const { deleteChat, isDeleting } = useDeleteChat({
    onSuccess: (deletedId) => {
      setChatPendingDelete(null)

      if (deletedId === activeChatId) {
        navigate(NEW_CHAT_PATH, { replace: true })
      }
    },
  })

  const rename = useCallback(
    (id, title) => renameChat({ id, title }),
    [renameChat]
  )

  const requestDelete = useCallback((chat) => setChatPendingDelete(chat), [])

  const cancelDelete = useCallback(() => setChatPendingDelete(null), [])

  const confirmDelete = useCallback(() => {
    if (chatPendingDelete) deleteChat({ id: chatPendingDelete.id })
  }, [chatPendingDelete, deleteChat])

  return {
    activeChatId,
    rename,
    chatPendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
  }
}

export default useChatActions
