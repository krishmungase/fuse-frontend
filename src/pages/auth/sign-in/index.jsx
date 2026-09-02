import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'

import LoginForm from './components/login-form'
import AuthSplit from '../components/auth-split'
import AuthHeader from '../components/auth-header'
import AuthSwitchLink from '../components/auth-switch-link'

const SignInPage = () => {
  usePageTitle({ title: pageTitle.SIGN_IN_PAGE })

  return (
    <AuthSplit illustration="/login.png">
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to continue to Fuse AI"
      />

      <LoginForm />

      <AuthSwitchLink
        prompt="Don't have an account?"
        to="/auth/sign-up"
        label="Sign up"
      />
    </AuthSplit>
  )
}

export default SignInPage
