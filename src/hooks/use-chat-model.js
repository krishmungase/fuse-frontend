import { useDispatch, useSelector } from 'react-redux'

import { useChatModels } from '@/apis'
import { setSelectedModel } from '@/store'

/**
 * The currently selected chat model, reconciled against the backend
 * allowlist. A stored id that the server no longer offers is ignored rather
 * than sent, so a model retired on the backend can never wedge the picker.
 */
const useChatModel = () => {
  const dispatch = useDispatch()
  const { models, defaultModel, isLoading, isError } = useChatModels()

  const storedModel = useSelector((state) => state.chat.selectedModel)

  const isAvailable = models.some((model) => model.id === storedModel)
  const selectedModel = isAvailable ? storedModel : defaultModel

  const selectModel = (id) => dispatch(setSelectedModel(id))

  return { models, selectedModel, selectModel, isLoading, isError }
}

export default useChatModel
