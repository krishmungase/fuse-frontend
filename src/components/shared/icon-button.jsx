import { forwardRef, useRef } from 'react'

import { cn } from '@/lib/utils'
import AnimatedIcon from './animated-icon'

const IconButton = forwardRef(
  (
    {
      icon,
      animated = false,
      iconSize = 20,
      label,
      className,
      iconClassName,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const iconRef = useRef(null)

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        onMouseEnter={(event) => {
          iconRef.current?.startAnimation()
          onMouseEnter?.(event)
        }}
        onMouseLeave={(event) => {
          iconRef.current?.stopAnimation()
          onMouseLeave?.(event)
        }}
        className={cn(
          'inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-chat-secondary transition-colors duration-150 outline-none hover:bg-chat-hover hover:text-chat-foreground focus-visible:bg-chat-hover focus-visible:text-chat-foreground',
          className
        )}
        {...props}
      >
        <AnimatedIcon
          ref={iconRef}
          icon={icon}
          animated={animated}
          size={iconSize}
          className={iconClassName}
        />
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
