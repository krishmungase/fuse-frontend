import { createContext, useContext } from 'react'

const ChatSessionContext = createContext({
  send: () => {},
  stop: () => {},
  status: 'ready',
})

export const ChatSessionProvider = ChatSessionContext.Provider

export const useChatSession = () => useContext(ChatSessionContext)
