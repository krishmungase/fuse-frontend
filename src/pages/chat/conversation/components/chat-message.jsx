import { MDX, ProductCarousel, WeatherCard } from '@/components'
import { cn } from '@/lib/utils'

const toBlocks = (parts) =>
  parts.reduce((blocks, part) => {
    if (part.type === 'text') {
      const previous = blocks[blocks.length - 1]

      if (previous?.type === 'text') {
        previous.text += part.text ?? ''
        return blocks
      }

      return [...blocks, { type: 'text', text: part.text ?? '' }]
    }

    if (part.type === 'data-products' && part.data?.products?.length) {
      return [...blocks, { type: 'products', data: part.data }]
    }

    if (part.type === 'data-weather' && part.data?.temperature !== undefined) {
      return [...blocks, { type: 'weather', data: part.data }]
    }

    return blocks
  }, [])

const ChatMessage = ({ role, parts = [] }) => {
  const isUser = role === 'user'

  const blocks = toBlocks(parts)

  const text = blocks
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')

  const lastTextIndex = blocks.findLastIndex((block) => block.type === 'text')

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'flex min-w-0 flex-col gap-4 text-[16px] leading-relaxed text-chat-foreground',
          isUser
            ? 'max-w-[80%] rounded-3xl bg-chat-surface px-5 py-4 whitespace-pre-wrap'
            : 'w-full'
        )}
      >
        {isUser
          ? text
          : blocks.map((block, index) => {
              if (block.type === 'products') {
                return (
                  <ProductCarousel
                    key={index}
                    query={block.data.query}
                    products={block.data.products}
                  />
                )
              }

              if (block.type === 'weather') {
                return <WeatherCard key={index} report={block.data} />
              }

              return (
                <MDX
                  key={index}
                  content={block.text}
                  showFollowUp={index === lastTextIndex}
                />
              )
            })}
      </div>
    </div>
  )
}

export default ChatMessage
