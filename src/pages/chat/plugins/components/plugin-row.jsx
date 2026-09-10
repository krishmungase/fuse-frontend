import { Check, Loader2, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

const PluginRow = ({ plugin, state, onToggle }) => {
  const Icon = plugin.icon
  const { connected, pending, accountEmail, live } = state

  const subtitle = connected && accountEmail ? accountEmail : plugin.description

  return (
    <div className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-chat-hover">
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl',
          plugin.tint
        )}
      >
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[14px] font-medium text-chat-foreground">
            {plugin.name}
          </p>

          {!live && (
            <span className="shrink-0 rounded-full border border-chat-border px-1.5 py-px text-[10px] tracking-wide text-chat-muted uppercase">
              Demo
            </span>
          )}
        </div>

        <p className="truncate text-[13px] text-chat-muted">{subtitle}</p>
      </div>

      <button
        type="button"
        disabled={pending}
        onClick={() => onToggle(plugin)}
        aria-label={
          connected ? `Disconnect ${plugin.name}` : `Connect ${plugin.name}`
        }
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors',
          pending && 'cursor-not-allowed opacity-60',
          !pending && 'cursor-pointer',
          connected
            ? 'border-transparent bg-chat-brand/15 text-chat-brand hover:bg-chat-brand/25'
            : 'border-chat-border text-chat-secondary hover:bg-chat-elevated hover:text-chat-foreground'
        )}
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : connected ? (
          <Check className="size-4" />
        ) : (
          <Plus className="size-4" />
        )}
      </button>
    </div>
  )
}

export default PluginRow
