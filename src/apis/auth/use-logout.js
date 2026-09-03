import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

import { logout } from '@/store'
import { successToast } from '@/lib'

const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useCallback(() => {
    dispatch(logout())
    queryClient.clear()
    navigate('/auth/sign-in', { replace: true })
    successToast({ message: 'You have been logged out.' })
  }, [dispatch, queryClient, navigate])
}

export default useLogout
