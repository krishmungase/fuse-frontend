import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'

import AuthSplit from '../components/auth-split'
import AuthHeader from '../components/auth-header'
import AuthSwitchLink from '../components/auth-switch-link'
import CheckEmailNotice from './components/check-email-notice'

const CheckEmailPage = () => {
  usePageTitle({ title: pageTitle.CHECK_EMAIL_PAGE })

  const navigate = useNavigate()
  const { state } = useLocation()

  const email = state?.email

  useEffect(() => {
    if (!email) {
      navigate('/auth/sign-up', { replace: true })
    }
  }, [email, navigate])

  if (!email) {
    return null
  }

  return (
    <AuthSplit illustration="/register.png">
      <AuthHeader
        title="Check your inbox"
        subtitle="We sent you a link to finish signing up"
      />

      <CheckEmailNotice email={email} />

      <AuthSwitchLink
        prompt="Wrong address?"
        to="/auth/sign-up"
        label="Start over"
      />
    </AuthSplit>
  )
}

export default CheckEmailPage
