import { useQuery } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

const toUIMessage = ({
  id,
  role,
  content,
  productGroups = [],
  weatherReports = [],
}) => ({
  id,
  role,
  parts: [
    ...productGroups
      .filter((group) => group?.products?.length)
      .map((group, index) => ({
        type: 'data-products',
        id: `${id}-products-${index}`,
        data: group,
      })),
    ...weatherReports
      .filter((report) => report?.temperature !== undefined)
      .map((report, index) => ({
        type: 'data-weather',
        id: `${id}-weather-${index}`,
        data: report,
      })),
    ...(content ? [{ type: 'text', text: content }] : []),
  ],
})

const useChat = ({ id, enabled = true }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: chatKeys.detail(id),
    queryFn: () => apis.detail({ id }),
    select: ({ data: response }) => ({
      chat: response?.data?.chat,
      messages: (response?.data?.messages ?? []).map(toUIMessage),
    }),
    enabled: Boolean(id) && enabled,
    retry: false,
  })

  return {
    chat: data?.chat,
    messages: data?.messages ?? [],
    isLoading: enabled && isLoading,
    isError,
    isNotFound: error?.response?.status === 404,
  }
}

export default useChat
