import { Image } from 'lucide-react'
import { SearchIcon, SquarePenIcon } from 'lucide-animated'

export const CHAT_MODES = [
  { id: 'chat', label: 'Chat' },
  { id: 'spark', label: 'Spark', badge: 'BETA' },
]

export const NEW_CHAT_PATH = '/chat'

export const CHAT_NAVIGATION = [
  {
    id: 'chat',
    label: 'New chat',
    icon: SquarePenIcon,
    animated: true,
    to: NEW_CHAT_PATH,
  },
  {
    id: 'search-chats',
    label: 'Search chats',
    icon: SearchIcon,
    animated: true,
  },
  { id: 'images', label: 'Images', icon: Image },
]
