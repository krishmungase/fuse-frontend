import { toast } from 'sonner'
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from 'lucide-react'

const VARIANTS = {
  success: { icon: CheckCircle2, tone: 'text-emerald-400' },
  error: { icon: XCircle, tone: 'text-red-400' },
  warning: { icon: TriangleAlert, tone: 'text-amber-400' },
  info: { icon: Info, tone: 'text-chat-brand' },
}

const createToast =
  (variant) =>
  ({ message, duration = 4000 }) => {
    const { icon: Icon, tone } = VARIANTS[variant]

    return toast.custom(
      (t) => (
        <div className="flex w-[340px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-2xl border border-chat-border bg-chat-elevated px-4 py-3.5 shadow-2xl">
          <Icon className={`mt-px size-[18px] shrink-0 ${tone}`} />

          <p className="flex-1 pt-px text-[13px] leading-relaxed text-chat-foreground">
            {message}
          </p>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            aria-label="Dismiss"
            className="-mt-1 -mr-1.5 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-chat-muted transition-colors duration-150 outline-none hover:bg-chat-hover hover:text-chat-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ),
      { duration }
    )
  }

export const successToast = createToast('success')
export const errorToast = createToast('error')
export const warningToast = createToast('warning')
export const infoToast = createToast('info')
