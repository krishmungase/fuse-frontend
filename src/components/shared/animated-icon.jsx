import { forwardRef, useImperativeHandle, useRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Renders a Lucide icon behind a single interface.
 *
 * `lucide-animated` icons are motion driven and expose an imperative
 * `startAnimation` / `stopAnimation` handle, while plain `lucide-react` icons
 * are static. Both are wrapped here so a parent (a nav row, an icon button)
 * can drive the animation from its own hover without caring which kind of
 * icon it was handed.
 *
 * Stroke width is normalised through CSS: the animated icons hard-code a
 * `stroke-width` presentation attribute, and a CSS rule beats an attribute.
 */
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
    // Aliased to a capitalised local so it can be used as a JSX element.
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
