import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router'

import { usePageTitle } from '@/hooks'
import { PLUGINS, PLUGIN_CATEGORIES, pageTitle } from '@/constants'
import ChatTopbar from '../conversation/components/chat-topbar'
import {
  ConnectionBanner,
  InstalledApps,
  PluginSection,
  PluginsHeader,
} from './components'
import { useConnectionBanner, usePluginConnections } from './hooks'

const matchesTerm = (plugin, term) =>
  `${plugin.name} ${plugin.description}`.toLowerCase().includes(term)

const PluginsPage = () => {
  usePageTitle({ title: pageTitle.PLUGINS_PAGE })

  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  const [term, setTerm] = useState('')

  const { getState, toggle, isLoading } = usePluginConnections()
  const { banner, dismissBanner } = useConnectionBanner()

  const query = term.trim().toLowerCase()

  const matches = useMemo(
    () => (query ? PLUGINS.filter((plugin) => matchesTerm(plugin, query)) : []),
    [query]
  )

  const installed = PLUGINS.filter((plugin) => getState(plugin).connected)

  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
      <ChatTopbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={openSidebar}
        onExpandSidebar={expandSidebar}
      />

      <div className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[900px] px-4 pt-8 pb-20 sm:px-6">
          <PluginsHeader term={term} onTermChange={setTerm} />

          {banner && (
            <ConnectionBanner
              tone={banner.tone}
              message={banner.message}
              onDismiss={dismissBanner}
            />
          )}

          {isLoading && (
            <p className="mt-10 text-[13px] text-chat-muted">
              Loading connections…
            </p>
          )}

          {query ? (
            <PluginSection
              title={matches.length ? 'Results' : 'No plugins found'}
              plugins={matches}
              getState={getState}
              onToggle={toggle}
            />
          ) : (
            <>
              <InstalledApps plugins={installed} onToggle={toggle} />

              {PLUGIN_CATEGORIES.map((category) => (
                <PluginSection
                  key={category}
                  title={category}
                  plugins={PLUGINS.filter(
                    (plugin) => plugin.category === category
                  )}
                  getState={getState}
                  onToggle={toggle}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default PluginsPage
