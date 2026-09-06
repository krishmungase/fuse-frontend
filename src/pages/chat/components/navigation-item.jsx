import { useRef } from 'react'
import { Link } from 'react-router'

import { cn } from '@/lib/utils'
import { AnimatedIcon } from '@/components'

const NavigationItem = ({
  icon,
  animated = false,
  label,
  to,
  active = false,
  iconSize = 17,
  className,
  ...props
}) => {
  const iconRef = useRef(null)

  const hoverProps = {
    onMouseEnter: () => iconRef.current?.startAnimation(),
    onMouseLeave: () => iconRef.current?.stopAnimation(),
  }

  const classes = cn(
    'flex h-10 w-full cursor-pointer items-center gap-3 rounded-full px-3 text-left text-[14px] transition-colors duration-150 outline-none',
    active
      ? 'bg-chat-active text-chat-foreground'
      : 'text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground focus-visible:bg-chat-hover focus-visible:text-chat-foreground',
    className
  )

  const content = (
    <>
      <AnimatedIcon
        ref={iconRef}
        icon={icon}
        animated={animated}
        size={iconSize}
      />
      <span className="truncate">{label}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...hoverProps} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...hoverProps} {...props}>
      {content}
    </button>
  )
}

export default NavigationItem
