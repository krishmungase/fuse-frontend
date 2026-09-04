import { useQuery } from '@tanstack/react-query'

import apis from './apis'

/**
 * The models the backend will actually accept, plus the id it falls back to.
 * The list is the server's allowlist, so adding a provider needs no frontend
 * change. It rarely moves, hence the long stale time.
 */
const useChatModels = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['chat', 'models'],
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
