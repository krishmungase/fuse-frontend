import { apiRequest } from '@/request'
import { REQUEST_METHOD } from '@/constants'

const urls = {
  chat: '/chat',
  models: '/chat/models',
  chatById: (id) => `/chat/${id}`,
}

const apis = {
  models: () =>
    apiRequest({
      url: urls.models,
      method: REQUEST_METHOD.GET,
    }),
  list: () =>
    apiRequest({
      url: urls.chat,
      method: REQUEST_METHOD.GET,
    }),
  detail: ({ id }) =>
    apiRequest({
      url: urls.chatById(id),
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
