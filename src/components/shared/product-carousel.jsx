import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import ProductCard from './product-card'

const SCROLL_STEP_PX = 420
const EDGE_TOLERANCE_PX = 8

const ProductCarousel = ({ query, products = [] }) => {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const syncArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanScrollLeft(scrollLeft > EDGE_TOLERANCE_PX)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - EDGE_TOLERANCE_PX)
  }, [])

  useEffect(() => {
    syncArrows()

    const track = trackRef.current
    if (!track) return

    const observer = new ResizeObserver(syncArrows)
    observer.observe(track)

    return () => observer.disconnect()
  }, [syncArrows, products])

  const scrollBy = (direction) =>
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP_PX,
      behavior: 'smooth',
    })

  if (!products.length) return null

  return (
    <div className="group/carousel relative -mx-1">
      <div
        ref={trackRef}
        onScroll={syncArrows}
        className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1"
      >
        {products.map((product, index) => (
          <ProductCard key={product.id ?? index} product={product} />
        ))}
      </div>

      <CarouselArrow
        side="left"
        visible={canScrollLeft}
        onClick={() => scrollBy(-1)}
      />
      <CarouselArrow
        side="right"
        visible={canScrollRight}
        onClick={() => scrollBy(1)}
      />

      {query && (
        <p className="px-1 pt-2 text-[12px] text-chat-muted">
          Live listings for “{query}”. Prices and availability may change.
        </p>
      )}
    </div>
  )
}

const CarouselArrow = ({ side, visible, onClick }) => {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      aria-label={side === 'left' ? 'Previous products' : 'More products'}
      onClick={onClick}
      className={cn(
        'absolute top-[86px] z-10 hidden size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-chat-border bg-chat-elevated text-chat-foreground shadow-lg transition-opacity hover:bg-chat-surface sm:flex',
        side === 'left' ? '-left-2' : '-right-2',
        visible
          ? 'opacity-0 group-hover/carousel:opacity-100'
          : 'pointer-events-none opacity-0'
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

export default ProductCarousel
