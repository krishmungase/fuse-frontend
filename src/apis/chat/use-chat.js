import { useQuery } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

/**
 * One persisted conversation, shaped as AI SDK UI messages so the streaming
 * hook can adopt it as its starting transcript without a second conversion.
 */
const toUIMessage = ({ id, role, content }) => ({
  id,
  role,
  parts: [{ type: 'text', text: content ?? '' }],
})

const useChat = ({ id, enabled = true }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: chatKeys.detail(id),
    queryFn: () => apis.detail({ id }),
    select: ({ data: response }) => ({
      chat: response?.data?.chat,
      messages: (response?.data?.messages ?? []).map(toUIMessage),
    }),
    enabled: Boolean(id) && enabled,
    retry: false,
  })

  return {
    chat: data?.chat,
    messages: data?.messages ?? [],
    isLoading: enabled && isLoading,
    isError,
    isNotFound: error?.response?.status === 404,
  }
}

export default useChat
