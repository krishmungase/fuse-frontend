import { useMutation } from '@tanstack/react-query'

import apis from './apis'

/**
 * Registration no longer signs the user in: the account stays pending until
 * the emailed link is opened and a password is set. onSuccess receives the
 * API payload plus the submitted values, so the caller can carry the address
 * through to the check-email page.
 */
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
