import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useOutletContext, useSearchParams } from 'react-router'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import { connectionKeys } from '@/apis'
import { usePageTitle } from '@/hooks'
import { PLUGINS, PLUGIN_CATEGORIES, pageTitle } from '@/constants'
import ChatTopbar from '../conversation/components/chat-topbar'
import ConnectionBanner from './components/connection-banner'
import PluginRow from './components/plugin-row'
import usePluginConnections from './hooks/use-plugin-connections'

const pluginByConnector = (connector) =>
  PLUGINS.find((plugin) => plugin.connector === connector)

const PluginsPage = () => {
  usePageTitle({ title: pageTitle.PLUGINS_PAGE })

  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [term, setTerm] = useState('')

  const { getState, toggle, isLoading } = usePluginConnections()

  const connectedParam = searchParams.get('connected')
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (!connectedParam) return

    queryClient.invalidateQueries({ queryKey: connectionKeys.lists() })
  }, [connectedParam, queryClient])

  const banner = useMemo(() => {
    if (connectedParam) {
      const plugin = pluginByConnector(connectedParam)
      return {
        tone: 'success',
        message: `${plugin?.name ?? 'App'} connected. You can now ask about it in chat.`,
      }
    }

    if (errorParam) {
      return {
        tone: 'error',
        message: `Could not finish connecting: ${errorParam}`,
      }
    }

    return null
  }, [connectedParam, errorParam])

  const dismissBanner = () => {
    searchParams.delete('connected')
    searchParams.delete('error')
    setSearchParams(searchParams, { replace: true })
  }

  const query = term.trim().toLowerCase()

  const matches = useMemo(
    () =>
      query
        ? PLUGINS.filter((plugin) =>
            `${plugin.name} ${plugin.description}`.toLowerCase().includes(query)
          )
        : PLUGINS,
    [query]
  )

  const installed = PLUGINS.filter((plugin) => getState(plugin).connected)

  const renderRows = (items) => (
    <div className="mt-2 grid gap-x-8 sm:grid-cols-2">
      {items.map((plugin) => (
        <PluginRow
          key={plugin.id}
          plugin={plugin}
          state={getState(plugin)}
          onToggle={toggle}
        />
      ))}
    </div>
  )

  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
      <ChatTopbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={openSidebar}
        onExpandSidebar={expandSidebar}
      />

      <div className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[900px] px-4 pt-8 pb-20 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[32px] leading-tight font-semibold text-chat-foreground">
                Plugins
              </h1>
              <p className="mt-1 text-[15px] text-chat-secondary">
                Work with Fuse across your favorite tools.
              </p>
            </div>

            <div className="relative w-full sm:w-[300px]">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-chat-secondary" />
              <input
                type="text"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search plugins"
                aria-label="Search plugins"
                className="h-11 w-full rounded-full border border-chat-border bg-chat-surface pr-4 pl-11 text-[14px] text-chat-foreground outline-none placeholder:text-chat-secondary focus-visible:border-chat-secondary"
              />
            </div>
          </div>

          {banner && (
            <ConnectionBanner
              tone={banner.tone}
              message={banner.message}
              onDismiss={dismissBanner}
            />
          )}

          {!query && installed.length > 0 && (
            <section className="mt-10">
              <p className="text-[14px] font-medium text-chat-foreground">
                Installed
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {installed.map((plugin) => {
                  const Icon = plugin.icon

                  return (
                    <button
                      key={plugin.id}
                      type="button"
                      title={`Disconnect ${plugin.name}`}
                      onClick={() => toggle(plugin)}
                      className={cn(
                        'flex size-12 cursor-pointer items-center justify-center rounded-xl transition-transform hover:scale-105',
                        plugin.tint
                      )}
                    >
                      <Icon className="size-6" />
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {isLoading && (
            <p className="mt-10 text-[13px] text-chat-muted">
              Loading connections…
            </p>
          )}

          {query ? (
            <section className="mt-10">
              <p className="text-[14px] font-medium text-chat-foreground">
                {matches.length ? 'Results' : 'No plugins found'}
              </p>
              {renderRows(matches)}
            </section>
          ) : (
            PLUGIN_CATEGORIES.map((category) => {
              const items = PLUGINS.filter(
                (plugin) => plugin.category === category
              )

              if (!items.length) return null

              return (
                <section key={category} className="mt-10">
                  <p className="text-[14px] font-medium text-chat-foreground">
                    {category}
                  </p>
                  {renderRows(items)}
                </section>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}

export default PluginsPage
