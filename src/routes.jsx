import { BrowserRouter, Navigate, Routes, Route } from 'react-router'

import { AuthLayout, ChatLayout } from './pages'
import {
  ChatPage,
  NewChatPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
} from './pages'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ChatLayout />}>
          <Route index element={<NewChatPage />} />
          <Route path="chat" element={<NewChatPage />} />
          <Route path="chat/:id" element={<ChatPage />} />
        </Route>

        <Route path="chat" element={<Navigate to="/" replace />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
