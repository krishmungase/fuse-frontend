import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'
import { useVerifyEmail } from '@/apis'

import AuthSplit from '../components/auth-split'
import AuthHeader from '../components/auth-header'
import VerifyEmailStatus from './components/verify-email-status'

/**
 * Landing page for the link in the verification email. Redeems the token once,
 * then hands the returned setup token to the create-password page through
 * router state -- deliberately not the URL, so it stays out of browser history
 * and any Referer header.
 */
const VerifyEmailPage = () => {
  usePageTitle({ title: pageTitle.VERIFY_EMAIL_PAGE })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [errorMessage, setErrorMessage] = useState('')

  const { verifyEmail } = useVerifyEmail({
    onSuccess: (data) =>
      navigate('/auth/create-password', {
        replace: true,
        state: {
          setupToken: data?.setupToken,
          name: data?.name,
          email: data?.email,
        },
      }),
    onError: (error) =>
      setErrorMessage(
        error?.response?.data?.message ||
          'We could not verify this link. Please request a new one.'
      ),
  })

  // The token is single-use, so this must fire exactly once -- StrictMode
  // remounts effects in development and a second call would burn a token the
  // first call already spent.
  const hasRequested = useRef(false)

  useEffect(() => {
    if (hasRequested.current) {
      return
    }
    hasRequested.current = true

    if (!token) {
      setErrorMessage('This link is missing its verification token.')
      return
    }

    verifyEmail({ data: { token } })
  }, [token, verifyEmail])

  return (
    <AuthSplit>
      <AuthHeader
        title={errorMessage ? 'Link not valid' : 'Verifying your email'}
        subtitle={
          errorMessage
            ? 'Request a fresh link and try again'
            : 'This will only take a moment'
        }
      />

      <VerifyEmailStatus errorMessage={errorMessage} />
    </AuthSplit>
  )
}

export default VerifyEmailPage
