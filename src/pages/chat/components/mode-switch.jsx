import { cn } from '@/lib/utils'
import { CHAT_MODES } from '@/constants'

/** Segmented Chat / Spark switch that sits under the wordmark. */
const ModeSwitch = ({ value, onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Workspace mode"
      className="flex items-center gap-1 rounded-full border border-chat-border p-1"
    >
      {CHAT_MODES.map((mode) => {
        const active = mode.id === value

        return (
          <button
            key={mode.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange?.(mode.id)}
            className={cn(
              'flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full text-[13px] transition-colors duration-150 outline-none',
              active
                ? 'bg-chat-active text-chat-foreground'
                : 'text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground'
            )}
          >
            {mode.label}
            {mode.badge ? (
              <span className="text-[9px] leading-none font-medium tracking-[0.06em] text-chat-muted">
                {mode.badge}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export default ModeSwitch
