import { keepPreviousData, useQuery } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

const useChats = ({ q = '' } = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: chatKeys.list(q),
    queryFn: () => apis.list({ q }),
    select: ({ data: response }) => response?.data?.chats ?? [],
    placeholderData: keepPreviousData,
    retry: false,
  })

  return { chats: data ?? [], isLoading, isFetching, isError }
}

export default useChats
