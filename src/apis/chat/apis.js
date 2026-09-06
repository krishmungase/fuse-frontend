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
  list: ({ q } = {}) =>
    apiRequest({
      url: urls.chat,
      method: REQUEST_METHOD.GET,
      ...(q && { params: { q } }),
    }),
  detail: ({ id }) =>
    apiRequest({
      url: urls.chatById(id),
      method: REQUEST_METHOD.GET,
    }),
  rename: ({ id, data }) =>
    apiRequest({
      data,
      url: urls.chatById(id),
      method: REQUEST_METHOD.PATCH,
    }),
  remove: ({ id }) =>
    apiRequest({
      url: urls.chatById(id),
      method: REQUEST_METHOD.DELETE,
    }),
  send: ({ data }) =>
    apiRequest({
      data,
      url: urls.chat,
      method: REQUEST_METHOD.POST,
    }),
}

export default apis
