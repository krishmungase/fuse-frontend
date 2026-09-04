import { apiRequest } from '@/request'
import { REQUEST_METHOD } from '@/constants'

const urls = {
  models: '/chat/models',
}

const apis = {
  models: () =>
    apiRequest({
      url: urls.models,
      method: REQUEST_METHOD.GET,
    }),
}

export default apis
