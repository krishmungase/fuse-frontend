import { useMutation } from '@tanstack/react-query'

import apis from './apis'

const useRegister = ({ onSuccess } = {}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => apis.register({ data }),
    onSuccess: ({ data: response }, variables) =>
      onSuccess?.(response?.data, variables.data),
    retry: false,
  })

  return { isLoading: isPending, register: mutate }
}

export default useRegister
