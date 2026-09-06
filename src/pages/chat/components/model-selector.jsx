import { useRef, useState } from 'react'
import { ChevronDownIcon } from 'lucide-animated'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AnimatedIcon } from '@/components'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ModelSelector = ({ models = [], value, onChange, isLoading }) => {
  const [open, setOpen] = useState(false)
  const chevronRef = useRef(null)

  const selected = models.find((model) => model.id === value)

  if (isLoading || !models.length) {
    return (
      <div className="flex h-9 items-center pr-2 pl-3 text-[14px] text-chat-muted">
        {isLoading ? 'Loading models…' : 'No models'}
      </div>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Select model"
          onMouseEnter={() => chevronRef.current?.startAnimation()}
          onMouseLeave={() => chevronRef.current?.stopAnimation()}
          className={cn(
            'flex h-9 cursor-pointer items-center gap-1 rounded-full pr-2 pl-3 text-[14px] transition-colors duration-150 outline-none',
            open
              ? 'bg-chat-hover text-chat-foreground'
              : 'text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground'
          )}
        >
          {selected?.label ?? 'Select model'}
          <AnimatedIcon
            ref={chevronRef}
            icon={ChevronDownIcon}
            animated
            size={16}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="min-w-[168px] rounded-2xl border-chat-border bg-chat-elevated p-1.5 text-chat-foreground shadow-lg"
      >
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onSelect={() => onChange?.(model.id)}
            className="cursor-pointer justify-between rounded-xl px-3 py-2 text-[14px] text-chat-secondary focus:bg-chat-hover focus:text-chat-foreground"
          >
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{model.label}</span>
              <span className="text-[12px] text-chat-muted">
                {model.provider}
              </span>
            </span>
            {model.id === value ? (
              <Check className="size-4 text-chat-foreground" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModelSelector
