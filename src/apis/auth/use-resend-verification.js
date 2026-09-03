import { useMutation } from '@tanstack/react-query'

import { successToast } from '@/lib'

import apis from './apis'

const useResendVerification = ({ onSuccess } = {}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => apis.resendVerification({ data }),
    onSuccess: ({ data: response }) => {
      successToast({
        message: response?.message || 'Verification email sent',
      })
      onSuccess?.(response?.data)
    },
    retry: false,
  })

  return { isLoading: isPending, resendVerification: mutate }
}

export default useResendVerification
