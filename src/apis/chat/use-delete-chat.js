import { useMutation, useQueryClient } from '@tanstack/react-query'

import apis from './apis'
import { chatKeys } from './query-keys'

const useDeleteChat = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id }) => apis.remove({ id }),
    onSuccess: (_, { id }) => {
      queryClient.removeQueries({ queryKey: chatKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() })
      onSuccess?.(id)
    },
    retry: false,
  })

  return { deleteChat: mutate, isDeleting: isPending }
}

export default useDeleteChat
