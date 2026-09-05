import { useQuery } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

/** The signed-in user's conversations, most recently active first. */
const useChats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: chatKeys.lists(),
    queryFn: () => apis.list(),
    select: ({ data: response }) => response?.data?.chats ?? [],
    retry: false,
  })

  return { chats: data ?? [], isLoading, isError }
}

export default useChats
