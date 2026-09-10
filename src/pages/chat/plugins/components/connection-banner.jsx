import { CheckCircle2, TriangleAlert, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const ConnectionBanner = ({ tone, message, onDismiss }) => {
  const isError = tone === 'error'
  const Icon = isError ? TriangleAlert : CheckCircle2

  return (
    <div
      role="status"
      className={cn(
        'mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-[13px]',
        isError
          ? 'border-red-500/25 bg-red-500/10 text-red-300'
          : 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
      )}
    >
      <Icon className="size-4 shrink-0" />
      <p className="min-w-0 flex-1">{message}</p>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="cursor-pointer text-current opacity-70 hover:opacity-100"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

export default ConnectionBanner
