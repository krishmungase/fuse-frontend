import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useLogin } from '@/apis'
import { Form } from '@/components/ui/form'
import AuthField from '../../components/auth-field'
import AuthSubmitButton from '../../components/auth-submit-button'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

const LoginForm = () => {
  const navigate = useNavigate()

  // `replace` drops sign-in from history, so Back from the chat doesn't
  // return a signed-in user to the login form.
  const { isLoading, login } = useLogin({
    onSuccess: () => navigate('/chat', { replace: true }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data) => login({ data })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <AuthField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
        />

        <AuthField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <AuthSubmitButton isLoading={isLoading}>Sign in</AuthSubmitButton>
      </form>
    </Form>
  )
}

export default LoginForm
