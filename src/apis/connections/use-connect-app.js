import { useMutation } from '@tanstack/react-query'

import apis from './apis'

const useConnectApp = ({ onError } = {}) => {
  const { mutate, isPending, variables } = useMutation({
    mutationFn: ({ provider }) => apis.authorize({ provider }),
    onSuccess: ({ data: response }) => {
      const url = response?.data?.url

      if (url) {
        window.location.assign(url)
      }
    },
    onError,
    retry: false,
  })

  return {
    connectApp: mutate,
    isConnecting: isPending,
    connectingProvider: isPending ? variables?.provider : null,
  }
}

export default useConnectApp
