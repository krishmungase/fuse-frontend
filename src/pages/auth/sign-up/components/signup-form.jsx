import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRegister } from '@/apis'
import { Form } from '@/components/ui/form'

import AuthField from '../../components/auth-field'
import AuthSubmitButton from '../../components/auth-submit-button'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

const SignUpForm = () => {
  const navigate = useNavigate()

  const { isLoading, register } = useRegister({
    onSuccess: (data, submitted) =>
      navigate('/auth/check-email', {
        replace: true,
        state: { email: data?.email ?? submitted.email },
      }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = (data) => register({ data })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <AuthField
          control={form.control}
          name="name"
          label="Name"
          placeholder="John Doe"
          autoComplete="name"
        />

        <AuthField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
        />

        <AuthSubmitButton isLoading={isLoading}>
          Create account
        </AuthSubmitButton>
      </form>
    </Form>
  )
}

export default SignUpForm
