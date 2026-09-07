import { useState } from 'react'
import { SettingsIcon } from 'lucide-animated'

import { cn, getInitials } from '@/lib'
import { IconButton } from '@/components'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import AccountPopover from './account-popover'

const UserProfile = ({
  name,
  plan,
  avatarUrl,
  onOpenSettings,
  onOpenProfile,
  className,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-full py-2 pr-2 transition-colors duration-150 hover:bg-chat-hover',
        className
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Open account menu"
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-full px-2 text-left outline-none"
          >
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-chat-elevated text-[12px] font-medium text-chat-foreground">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[13px] leading-tight text-chat-foreground">
                {name}
              </span>
              {plan ? (
                <span className="truncate text-[11px] leading-tight text-chat-muted">
                  {plan}
                </span>
              ) : null}
            </span>
          </button>
        </PopoverTrigger>

        <AccountPopover
          onClose={() => setOpen(false)}
          onOpenProfile={onOpenProfile}
        />
      </Popover>

      <div className="relative shrink-0">
        <IconButton
          icon={SettingsIcon}
          animated
          iconSize={20}
          label="Settings"
          onClick={onOpenSettings}
          className="h-9 w-9"
        />
        <span className="pointer-events-none absolute top-1.5 right-1.5 size-1.5 rounded-full bg-chat-status" />
      </div>
    </div>
  )
}

export default UserProfile
