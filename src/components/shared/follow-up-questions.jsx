import { ArrowRight, CornerDownRight } from 'lucide-react'

import { cn } from '@/lib/utils'

/** Related questions a reply suggested, offered as one-click prompts. */
const FollowUpQuestions = ({
  questions,
  onQuestionClick,
  isLoading = false,
}) => {
  if (!questions?.length) return null

  return (
    <div className="mt-8 rounded-xl border border-chat-border bg-chat-surface/40 p-4">
      <div className="mb-3 flex items-center gap-2 text-chat-foreground">
        <CornerDownRight className="size-4" />
        <h3 className="text-xs font-semibold tracking-wide uppercase">
          Related questions
        </h3>
      </div>

      <div className="grid grid-cols-1">
        {questions.map((item, index) => (
          <button
            key={item.id ?? index}
            type="button"
            onClick={() => onQuestionClick?.(item.question)}
            disabled={isLoading}
            className={cn(
              'group flex cursor-pointer items-start gap-2 rounded-md px-3 py-2 transition-all duration-150 hover:bg-chat-hover',
              isLoading && 'cursor-not-allowed opacity-50'
            )}
          >
            <ArrowRight className="mt-0.5 size-3.5 text-chat-secondary transition-transform group-hover:translate-x-0.5" />
            <span className="text-left text-sm text-chat-secondary group-hover:text-chat-foreground">
              {item.question}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FollowUpQuestions
