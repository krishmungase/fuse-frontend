import { useEffect, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

import { PLUGINS } from '@/constants'
import { connectionKeys } from '@/apis'

const findByConnector = (connector) =>
  PLUGINS.find((plugin) => plugin.connector === connector)

const useConnectionBanner = () => {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const connected = searchParams.get('connected')
  const error = searchParams.get('error')

  useEffect(() => {
    if (!connected) return

    queryClient.invalidateQueries({ queryKey: connectionKeys.lists() })
  }, [connected, queryClient])

  const banner = useMemo(() => {
    if (connected) {
      return {
        tone: 'success',
        message: `${findByConnector(connected)?.name ?? 'App'} connected. You can now ask about it in chat.`,
      }
    }

    if (error) {
      return { tone: 'error', message: `Could not finish connecting: ${error}` }
    }

    return null
  }, [connected, error])

  const dismiss = () => {
    searchParams.delete('connected')
    searchParams.delete('error')
    setSearchParams(searchParams, { replace: true })
  }

  return { banner, dismissBanner: dismiss }
}

export default useConnectionBanner
