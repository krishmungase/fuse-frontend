import { apiRequest } from '@/request'
import { REQUEST_METHOD } from '@/constants'

const urls = {
  connections: '/connections',
  authorize: (provider) => `/connections/${provider}/authorize`,
  byProvider: (provider) => `/connections/${provider}`,
}

const apis = {
  list: () =>
    apiRequest({
      url: urls.connections,
      method: REQUEST_METHOD.GET,
    }),
  authorize: ({ provider }) =>
    apiRequest({
      url: urls.authorize(provider),
      method: REQUEST_METHOD.GET,
    }),
  disconnect: ({ provider }) =>
    apiRequest({
      url: urls.byProvider(provider),
      method: REQUEST_METHOD.DELETE,
    }),
}

export default apis
