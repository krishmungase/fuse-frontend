import { forwardRef, useImperativeHandle, useRef } from 'react'

import { cn } from '@/lib/utils'

const AnimatedIcon = forwardRef(
  (
    {
      icon,
      animated = false,
      size = 20,
      strokeWidth = 1.75,
      className,
      ...props
    },
    ref
  ) => {
    const Icon = icon
    const iconRef = useRef(null)

    useImperativeHandle(ref, () => ({
      startAnimation: () => iconRef.current?.startAnimation?.(),
      stopAnimation: () => iconRef.current?.stopAnimation?.(),
    }))

    const classes = cn(
      'inline-flex shrink-0 items-center justify-center [&_svg]:[stroke-width:var(--icon-stroke)]',
      className
    )

    const style = { '--icon-stroke': strokeWidth }

    if (!animated) {
      return (
        <span className={classes} style={style} {...props}>
          <Icon size={size} strokeWidth={strokeWidth} />
        </span>
      )
    }

    return (
      <Icon
        ref={iconRef}
        size={size}
        className={classes}
        style={style}
        {...props}
      />
    )
  }
)

AnimatedIcon.displayName = 'AnimatedIcon'

export default AnimatedIcon
