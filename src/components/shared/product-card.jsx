import { useState } from 'react'
import { ImageOff, Star } from 'lucide-react'

import { cn } from '@/lib/utils'

const ProductCard = ({ product }) => {
  const [imageFailed, setImageFailed] = useState(false)

  const { title, price, source, rating, thumbnail, productLink } = product

  const Wrapper = productLink ? 'a' : 'div'
  const linkProps = productLink
    ? { href: productLink, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...linkProps}
      className={cn(
        'group flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-chat-border bg-chat-surface/60 transition-colors',
        productLink && 'hover:border-white/15 hover:bg-chat-surface'
      )}
    >
      <div className="flex h-[180px] items-center justify-center bg-white p-3">
        {thumbnail && !imageFailed ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <ImageOff className="size-7 text-neutral-300" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="line-clamp-2 text-[13px] leading-snug font-medium text-chat-foreground">
          {title}
        </p>

        {price && (
          <p className="text-[15px] font-semibold text-chat-foreground">
            {price}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          {source && (
            <span className="truncate text-[12px] text-chat-muted">
              {source}
            </span>
          )}

          {Number.isFinite(rating) && (
            <span className="flex shrink-0 items-center gap-1 text-[12px] text-chat-secondary">
              <Star className="size-3 fill-current text-amber-400" />
              {rating}
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default ProductCard
