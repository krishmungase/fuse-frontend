import { useMutation } from '@tanstack/react-query'

import { successToast } from '@/lib'

import apis from './apis'

/**
 * Writes the chosen password and activates the account. No session is issued
 * here by design -- the user signs in afterwards with the credentials they
 * just created.
 */
const useSetPassword = ({ onSuccess } = {}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => apis.setPassword({ data }),
    onSuccess: ({ data: response }) => {
      successToast({
        message: response?.message || 'Password created successfully',
      })
      onSuccess?.(response?.data)
    },
    retry: false,
  })

  return { isLoading: isPending, setPassword: mutate }
}

export default useSetPassword
