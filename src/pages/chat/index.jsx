import { useOutletContext } from 'react-router'

import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'
import MainChat from './components/main-chat'

const NewChatPage = () => {
  usePageTitle({ title: pageTitle.CHAT_PAGE })

  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  return (
    <MainChat
      sidebarCollapsed={sidebarCollapsed}
      onOpenSidebar={openSidebar}
      onExpandSidebar={expandSidebar}
    />
  )
}

export default NewChatPage
