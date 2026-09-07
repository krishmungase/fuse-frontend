import { NOTEBOOK_ACTIONS } from '@/constants'
import NavigationItem from './navigation-item'
import SidebarSection from './sidebar-section'

const Notebooks = ({ onCreate }) => {
  return (
    <SidebarSection title="Notebooks">
      {NOTEBOOK_ACTIONS.map((action) => (
        <NavigationItem
          key={action.id}
          icon={action.icon}
          animated={action.animated}
          label={action.label}
          onClick={() => onCreate?.(action.id)}
        />
      ))}
    </SidebarSection>
  )
}

export default Notebooks
