import { useMutation } from '@tanstack/react-query'

import apis from './apis'

/**
 * Redeems the token from the verification email. On success the API returns a
 * separate, short-lived `setupToken` that authorises the password write.
 */
const useVerifyEmail = ({ onSuccess, onError } = {}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => apis.verifyEmail({ data }),
    onSuccess: ({ data: response }) => onSuccess?.(response?.data),
    onError: (error) => onError?.(error),
    retry: false,
  })

  return { isLoading: isPending, verifyEmail: mutate }
}

export default useVerifyEmail
