import { useMutation } from '@tanstack/react-query'

/**
 * Sends one prompt to the chat endpoint. The backend resolves the model from
 * the slug and answers with the full turn, so the reply is available in
 * onSuccess. Errors already surface as toasts via the axios interceptor.
 */
import apis from './apis'

const useSendMessage = ({ onSuccess } = {}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data }) => apis.send({ data }),
    onSuccess: ({ data: response }) => onSuccess?.(response?.data),
    retry: false,
  })

  return { isLoading: isPending, sendMessage: mutate }
}

export default useSendMessage
