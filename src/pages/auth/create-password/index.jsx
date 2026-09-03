import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'

import AuthSplit from '../components/auth-split'
import AuthHeader from '../components/auth-header'
import CreatePasswordForm from './components/create-password-form'

/**
 * Final registration step. The setup token arrives in router state from the
 * verify-email page rather than the URL, so it never lands in browser history
 * or a Referer header. A direct visit (or a refresh) has no token and is sent
 * back to sign-in.
 */
const CreatePasswordPage = () => {
  usePageTitle({ title: pageTitle.CREATE_PASSWORD_PAGE })

  const navigate = useNavigate()
  const { state } = useLocation()

  const setupToken = state?.setupToken

  useEffect(() => {
    if (!setupToken) {
      navigate('/auth/sign-in', { replace: true })
    }
  }, [setupToken, navigate])

  if (!setupToken) {
    return null
  }

  return (
    <AuthSplit illustration="/register.png">
      <AuthHeader
        title="Create your password"
        subtitle={
          state?.email
            ? `Setting up ${state.email}`
            : 'Choose a password to finish setting up your account'
        }
      />

      <CreatePasswordForm setupToken={setupToken} />
    </AuthSplit>
  )
}

export default CreatePasswordPage
