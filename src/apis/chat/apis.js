import { apiRequest } from '@/request'
import { REQUEST_METHOD } from '@/constants'

const urls = {
  chat: '/chat',
  models: '/chat/models',
}

const apis = {
  models: () =>
    apiRequest({
      url: urls.models,
      method: REQUEST_METHOD.GET,
    }),
  send: ({ data }) =>
    apiRequest({
      data,
      url: urls.chat,
      method: REQUEST_METHOD.POST,
    }),
}

export default apis
