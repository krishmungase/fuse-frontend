import { useMutation, useQueryClient } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

const useRenameChat = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, title }) => apis.rename({ id, data: { title } }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() })
      queryClient.invalidateQueries({ queryKey: chatKeys.detail(id) })
      onSuccess?.()
    },
    retry: false,
  })

  return { renameChat: mutate, isRenaming: isPending }
}

export default useRenameChat
