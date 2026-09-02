import { Spinner } from '@/components/ui/spinner'

/** Primary auth action: a solid light pill, matching the monochrome chat UI. */
const AuthSubmitButton = ({ isLoading, children }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-chat-foreground text-[15px] font-medium text-chat-background transition-opacity duration-150 outline-none hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? <Spinner className="size-4" /> : null}
      {children}
    </button>
  )
}

export default AuthSubmitButton
