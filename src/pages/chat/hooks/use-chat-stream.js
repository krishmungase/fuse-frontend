import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'
import { useQueryClient } from '@tanstack/react-query'

import { chatKeys } from '@/apis'
import { appEnv } from '@/constants'

const useChatStream = ({ id, initialMessages }) => {
  const token = useSelector((state) => state.auth.token)
  const queryClient = useQueryClient()

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${appEnv.BACKEND_BASE_URL}/chat`,
        headers: () => (token ? { Authorization: `Bearer ${token}` } : {}),
        prepareSendMessagesRequest: ({ messages, body }) => {
          const last = messages[messages.length - 1]
          const text = (last?.parts ?? [])
            .filter((part) => part.type === 'text')
            .map((part) => part.text)
            .join('')

          return { body: { chatId: id, message: text, ...body } }
        },
      }),
    [id, token]
  )

  const { messages, sendMessage, status, stop, error } = useChat({
    id,
    transport,
    messages: initialMessages,
    // The title is derived server-side from the first message, so the sidebar
    // only learns a new chat's name once the turn lands.
    onFinish: () =>
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() }),
  })

  return { messages, sendMessage, status, stop, error }
}

export default useChatStream
