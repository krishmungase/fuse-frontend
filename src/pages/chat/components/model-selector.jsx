import { useRef, useState } from 'react'
import { ChevronDownIcon } from 'lucide-animated'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AnimatedIcon } from '@/components'
import { CHAT_MODELS } from '@/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** Compact model picker that lives on the right of the prompt input. */
const ModelSelector = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const chevronRef = useRef(null)

  const selected = CHAT_MODELS.find((model) => model.id === value)

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
          {selected?.label}
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
        {CHAT_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onSelect={() => onChange?.(model.id)}
            className="cursor-pointer justify-between rounded-xl px-3 py-2 text-[14px] text-chat-secondary focus:bg-chat-hover focus:text-chat-foreground"
          >
            {model.label}
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
