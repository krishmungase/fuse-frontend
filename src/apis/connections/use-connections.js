import { useQuery } from '@tanstack/react-query'

import apis from './apis'
import { connectionKeys } from './query-keys'

const useConnections = ({ enabled = true } = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: connectionKeys.lists(),
    queryFn: () => apis.list(),
    select: ({ data: response }) => response?.data?.connections ?? [],
    enabled,
    retry: false,
  })

  return {
    connections: data ?? [],
    isLoading,
    isFetching,
    isError,
  }
}

export default useConnections
