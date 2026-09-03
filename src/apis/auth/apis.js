import { apiRequest } from '@/request'
import { REQUEST_METHOD } from '@/constants'

const urls = {
  login: '/users/login',
  register: '/users/register',
  verifyEmail: '/users/verify-email',
  setPassword: '/users/set-password',
  resendVerification: '/users/resend-verification',
}

const apis = {
  login: ({ data }) =>
    apiRequest({
      data,
      url: urls.login,
      method: REQUEST_METHOD.POST,
    }),
  register: ({ data }) =>
    apiRequest({
      data,
      url: urls.register,
      method: REQUEST_METHOD.POST,
    }),
  verifyEmail: ({ data }) =>
    apiRequest({
      data,
      url: urls.verifyEmail,
      method: REQUEST_METHOD.POST,
    }),
  setPassword: ({ data }) =>
    apiRequest({
      data,
      url: urls.setPassword,
      method: REQUEST_METHOD.POST,
    }),
  resendVerification: ({ data }) =>
    apiRequest({
      data,
      url: urls.resendVerification,
      method: REQUEST_METHOD.POST,
    }),
}

export default apis
