import { useMutation, useQueryClient } from '@tanstack/react-query'

import apis from './apis'
import { connectionKeys } from './query-keys'

const useDisconnectApp = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, variables } = useMutation({
    mutationFn: ({ provider }) => apis.disconnect({ provider }),
    onSuccess: (_, { provider }) => {
      queryClient.invalidateQueries({ queryKey: connectionKeys.lists() })
      onSuccess?.(provider)
    },
    retry: false,
  })

  return {
    disconnectApp: mutate,
    isDisconnecting: isPending,
    disconnectingProvider: isPending ? variables?.provider : null,
  }
}

export default useDisconnectApp
