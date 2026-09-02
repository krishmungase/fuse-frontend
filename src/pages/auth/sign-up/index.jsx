import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'

import SignUpForm from './components/signup-form'
import AuthSplit from '../components/auth-split'
import AuthHeader from '../components/auth-header'
import AuthSwitchLink from '../components/auth-switch-link'

const SignUpPage = () => {
  usePageTitle({ title: pageTitle.SIGN_UP_PAGE })

  return (
    <AuthSplit illustration="/register.png">
      <AuthHeader
        title="Create your account"
        subtitle="Get started with Fuse AI in seconds"
      />

      <SignUpForm />

      <AuthSwitchLink
        prompt="Already have an account?"
        to="/auth/sign-in"
        label="Sign in"
      />
    </AuthSplit>
  )
}

export default SignUpPage
