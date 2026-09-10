import { useCallback, useEffect, useMemo, useState } from 'react'

import { useConnectApp, useConnections, useDisconnectApp } from '@/apis'

const STORAGE_KEY = 'fuse.demo-plugins'

const readDemoPlugins = () => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const usePluginConnections = () => {
  const { connections, isLoading } = useConnections()
  const { connectApp, connectingProvider } = useConnectApp()
  const { disconnectApp, disconnectingProvider } = useDisconnectApp()

  const [demoPlugins, setDemoPlugins] = useState(readDemoPlugins)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoPlugins))
    } catch {
      return
    }
  }, [demoPlugins])

  const byProvider = useMemo(
    () =>
      new Map(
        connections.map((connection) => [connection.provider, connection])
      ),
    [connections]
  )

  const getState = useCallback(
    (plugin) => {
      if (!plugin.connector) {
        return {
          live: false,
          connected: demoPlugins.includes(plugin.id),
          accountEmail: null,
          pending: false,
        }
      }

      const connection = byProvider.get(plugin.connector)

      return {
        live: true,
        connected: Boolean(connection?.connected),
        accountEmail: connection?.accountEmail ?? null,
        pending:
          connectingProvider === plugin.connector ||
          disconnectingProvider === plugin.connector,
      }
    },
    [byProvider, connectingProvider, demoPlugins, disconnectingProvider]
  )

  const toggle = useCallback(
    (plugin) => {
      if (!plugin.connector) {
        setDemoPlugins((current) =>
          current.includes(plugin.id)
            ? current.filter((id) => id !== plugin.id)
            : [...current, plugin.id]
        )
        return
      }

      if (getState(plugin).connected) {
        disconnectApp({ provider: plugin.connector })
        return
      }

      connectApp({ provider: plugin.connector })
    },
    [connectApp, disconnectApp, getState]
  )

  return { getState, toggle, isLoading }
}

export default usePluginConnections
