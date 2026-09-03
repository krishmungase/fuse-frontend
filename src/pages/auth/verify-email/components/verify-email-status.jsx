import { Link } from 'react-router'

import { Spinner } from '@/components/ui/spinner'

import ResendVerificationForm from './resend-verification-form'

/**
 * Either the in-flight spinner or the recovery path. There is no success state:
 * a verified token redirects straight to create-password.
 */
const VerifyEmailStatus = ({ errorMessage }) => {
  if (!errorMessage) {
    return (
      <div className="flex w-full flex-col items-center gap-3 py-6">
        <Spinner className="size-5 text-chat-secondary" />
        <p className="text-[14px] text-chat-secondary">Checking your link…</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <p className="rounded-2xl border border-chat-border bg-chat-surface px-5 py-4 text-center text-[14px] leading-relaxed text-chat-secondary">
        {errorMessage}
      </p>

      <ResendVerificationForm />

      <p className="text-center text-[14px] text-chat-secondary">
        Already have an account?{' '}
        <Link
          to="/auth/sign-in"
          className="text-chat-foreground transition-colors duration-150 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default VerifyEmailStatus
