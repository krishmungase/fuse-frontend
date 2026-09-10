import { Image, Puzzle } from 'lucide-react'
import { SearchIcon, SquarePenIcon } from 'lucide-animated'

import { PLUGINS_PATH } from './plugins'

export const CHAT_MODES = [
  { id: 'chat', label: 'Chat' },
  { id: 'spark', label: 'Spark', badge: 'BETA' },
]

export const NEW_CHAT_PATH = '/chat'
export const SEARCH_CHATS_PATH = '/chat/search'

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
    to: SEARCH_CHATS_PATH,
  },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'plugins', label: 'Plugins', icon: Puzzle, to: PLUGINS_PATH },
]
