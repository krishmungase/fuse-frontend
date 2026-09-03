import { LogOut, User as UserIcon, X } from 'lucide-react'

import { getInitials } from '@/lib'
import { useAuth } from '@/hooks'
import { useLogout } from '@/apis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PopoverContent } from '@/components/ui/popover'

/** One action row. Rows sit in a shared card, split by a hairline divider. */
const AccountAction = ({ icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left text-[14px] text-chat-foreground transition-colors duration-150 outline-none first:rounded-t-2xl last:rounded-b-2xl hover:bg-chat-hover"
  >
    {icon}
    {label}
  </button>
)

/**
 * Account menu anchored above the sidebar profile row. Rendered as popover
 * content only -- the Popover root and trigger live in UserProfile, so the
 * panel stays attached to the row it belongs to.
 */
const AccountPopover = ({ onClose, onOpenProfile }) => {
  const { user } = useAuth()
  const logout = useLogout()

  return (
    <PopoverContent
      side="top"
      align="start"
      sideOffset={12}
      className="w-[320px] rounded-3xl border-chat-border bg-chat-sidebar p-3 text-chat-foreground shadow-2xl"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close account menu"
          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-chat-secondary transition-colors duration-150 outline-none hover:bg-chat-hover hover:text-chat-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-chat-elevated px-4 py-4">
        <Avatar className="size-12 shrink-0 ring-2 ring-chat-brand ring-offset-2 ring-offset-chat-elevated">
          <AvatarImage src={user?.avatar ?? ''} alt={user?.name} />
          <AvatarFallback className="bg-chat-surface text-[14px] font-medium text-chat-foreground">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[15px] leading-tight text-chat-foreground">
            {user?.name}
          </span>
          <span className="truncate pt-0.5 text-[12px] leading-tight text-chat-secondary">
            {user?.email}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-col rounded-2xl bg-chat-elevated">
        <AccountAction
          icon={<UserIcon className="size-4 text-chat-secondary" />}
          label="Profile"
          onClick={() => {
            onClose()
            onOpenProfile?.()
          }}
        />

        <div className="mx-4 h-px bg-chat-border" />

        <AccountAction
          icon={<LogOut className="size-4 text-chat-secondary" />}
          label="Log out"
          onClick={() => {
            onClose()
            logout()
          }}
        />
      </div>
    </PopoverContent>
  )
}

export default AccountPopover
