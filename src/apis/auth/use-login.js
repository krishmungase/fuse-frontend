import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

import { setAuth } from '@/store'
import { successToast } from '@/lib'

import apis from './apis'

const useLogin = ({ onSuccess } = {}) => {
  const dispatch = useDispatch()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data }) => apis.login({ data }),
    onSuccess: ({ data: response }) => {
      successToast({ message: 'User logged in successfully' })
      dispatch(
        setAuth({
          user: response?.data?.user,
          token: response?.data?.accessToken,
        })
      )
      onSuccess?.(response?.data)
    },
    retry: false,
  })

  return { isLoading: isPending, login: mutate }
}

export default useLogin
