/**
 * Shown between hitting send and the first token landing. That gap is roughly
 * a second against Groq, and without a mark on screen the app looks like it
 * ignored the message.
 */
const ThinkingIndicator = () => (
  <div className="flex justify-start" aria-live="polite" aria-label="Thinking">
    <span className="size-3 animate-pulse rounded-full bg-chat-foreground" />
  </div>
)

export default ThinkingIndicator
