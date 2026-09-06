import { useQuery } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

const useChatModels = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: chatKeys.models(),
    queryFn: () => apis.models(),
    select: ({ data: response }) => response?.data,
    staleTime: 60 * 60 * 1000,
    retry: false,
  })

  return {
    models: data?.models ?? [],
    defaultModel: data?.defaultModel ?? null,
    isLoading,
    isError,
  }
}

export default useChatModels
