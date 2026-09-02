import { cn } from '@/lib/utils'

/**
 * One turn of a conversation. User turns sit in a rounded bubble on the right,
 * assistant turns run as plain text across the column.
 */
const ChatMessage = ({ role, content }) => {
  const isUser = role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'flex flex-col gap-4 text-[16px] leading-relaxed text-chat-foreground',
          isUser
            ? 'max-w-[80%] rounded-3xl bg-chat-surface px-5 py-4'
            : 'w-full'
        )}
      >
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default ChatMessage
