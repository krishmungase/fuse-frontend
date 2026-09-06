import { useLocation } from 'react-router'

import { CHAT_NAVIGATION } from '@/constants'
import NavigationItem from './navigation-item'

const SidebarNavigation = ({ activeId, onSelect, onNavigate }) => {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col gap-0.5">
      {CHAT_NAVIGATION.map((item) => (
        <NavigationItem
          key={item.id}
          to={item.to}
          icon={item.icon}
          animated={item.animated}
          label={item.label}
          active={item.to ? pathname === item.to : item.id === activeId}
          onClick={() => (item.to ? onNavigate?.() : onSelect?.(item.id))}
        />
      ))}
    </nav>
  )
}

export default SidebarNavigation
