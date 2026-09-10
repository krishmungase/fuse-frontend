import { BrowserRouter, Navigate, Routes, Route } from 'react-router'

import { AuthLayout, ChatLayout } from './pages'
import {
  ChatPage,
  CheckEmailPage,
  CreatePasswordPage,
  NewChatPage,
  PluginsPage,
  SearchChatsPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  VerifyEmailPage,
} from './pages'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/chat" replace />} />

        <Route element={<ChatLayout />}>
          <Route path="chat" element={<NewChatPage />} />
          <Route path="chat/search" element={<SearchChatsPage />} />
          <Route path="chat/plugins" element={<PluginsPage />} />
          <Route path="chat/:id" element={<ChatPage />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="check-email" element={<CheckEmailPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="create-password" element={<CreatePasswordPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
