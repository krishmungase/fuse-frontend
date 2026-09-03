import { MailCheck } from 'lucide-react'

import { useResendVerification } from '@/apis'

/**
 * Restates where the link went and offers a resend. The spam prompt is
 * deliberate -- a first message from a new sender lands there often enough
 * that people give up before looking.
 */
const CheckEmailNotice = ({ email }) => {
  const { isLoading, resendVerification } = useResendVerification()

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full border border-chat-border bg-chat-surface">
        <MailCheck className="size-6 text-chat-foreground" />
      </div>

      <p className="text-[15px] leading-relaxed text-chat-secondary">
        A verification link is on its way to{' '}
        <span className="text-chat-foreground">{email}</span>. Open it to set
        your password and finish setting up your account.
      </p>

      <p className="rounded-2xl border border-chat-border bg-chat-surface px-5 py-4 text-[13px] leading-relaxed text-chat-muted">
        It can take a minute to arrive. If you don&apos;t see it, check your
        spam or junk folder — the link expires in 30 minutes.
      </p>

      <button
        type="button"
        disabled={isLoading}
        onClick={() => resendVerification({ data: { email } })}
        className="cursor-pointer text-[14px] text-chat-secondary underline-offset-4 transition-colors duration-150 outline-none hover:text-chat-foreground hover:underline disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Sending…' : "Didn't get it? Send it again"}
      </button>
    </div>
  )
}

export default CheckEmailNotice
