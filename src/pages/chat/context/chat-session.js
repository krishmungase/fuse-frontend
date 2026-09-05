import { createContext, useContext } from 'react'

/**
 * How the prompt input talks to whichever screen it sits on. `/chat` mints an
 * id and routes, `/chat/:id` streams -- the input calls the same `send` for
 * both and stays free of chat state.
 */
const ChatSessionContext = createContext({
  send: () => {},
  stop: () => {},
  status: 'ready',
})

export const ChatSessionProvider = ChatSessionContext.Provider

export const useChatSession = () => useContext(ChatSessionContext)
