import { MDX } from '@/components'
import { cn } from '@/lib/utils'

/**
 * One turn of a conversation. User turns sit in a rounded bubble on the right,
 * assistant turns render as markdown across the column.
 */
const ChatMessage = ({ role, parts = [] }) => {
  const isUser = role === 'user'

  const text = parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')

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
        {isUser ? text : <MDX content={text} />}
      </div>
    </div>
  )
}

export default ChatMessage
