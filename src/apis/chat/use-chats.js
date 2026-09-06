import { keepPreviousData, useQuery } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

const useChats = ({ q = '' } = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: chatKeys.list(q),
    queryFn: () => apis.list({ q }),
    select: ({ data: response }) => response?.data?.chats ?? [],
    // Each keystroke is a new cache key. Holding the previous results keeps the
    // list from blanking out between them.
    placeholderData: keepPreviousData,
    retry: false,
  })

  return { chats: data ?? [], isLoading, isFetching, isError }
}

export default useChats
