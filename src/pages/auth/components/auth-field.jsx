import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

/**
 * A labelled auth input shaped like the chat prompt pill. Password fields get
 * a reveal toggle that matches the circular icon buttons used elsewhere.
 */
const AuthField = ({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}) => {
  const [revealed, setRevealed] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && revealed ? 'text' : type

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-2">
          <FormLabel className="px-1 text-[13px] font-normal text-chat-secondary">
            {label}
          </FormLabel>

          <div className="relative">
            <FormControl>
              <input
                {...field}
                type={inputType}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={cn(
                  'h-12 w-full rounded-full border border-chat-border bg-chat-surface px-5 text-[15px] text-chat-foreground transition-colors duration-150 outline-none placeholder:text-chat-muted focus:border-white/20',
                  isPassword && 'pr-12'
                )}
              />
            </FormControl>

            {isPassword ? (
              <button
                type="button"
                onClick={() => setRevealed((prev) => !prev)}
                aria-label={revealed ? 'Hide password' : 'Show password'}
                className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-chat-secondary transition-colors duration-150 outline-none hover:bg-chat-hover hover:text-chat-foreground"
              >
                {revealed ? (
                  <EyeOff className="size-[18px]" />
                ) : (
                  <Eye className="size-[18px]" />
                )}
              </button>
            ) : null}
          </div>

          <FormMessage className="px-1 text-[12px]" />
        </FormItem>
      )}
    />
  )
}

export default AuthField
