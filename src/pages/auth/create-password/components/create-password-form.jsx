import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSetPassword } from '@/apis'
import { Form } from '@/components/ui/form'

import AuthField from '../../components/auth-field'
import AuthSubmitButton from '../../components/auth-submit-button'

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(128, { message: 'Password must be 128 characters or fewer' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm password' }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

const CreatePasswordForm = ({ setupToken }) => {
  const navigate = useNavigate()

  const { isLoading, setPassword } = useSetPassword({
    onSuccess: () => navigate('/auth/sign-in', { replace: true }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = ({ password, confirmPassword }) =>
    setPassword({ data: { setupToken, password, confirmPassword } })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <AuthField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />

        <AuthField
          control={form.control}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <AuthSubmitButton isLoading={isLoading}>
          Create password
        </AuthSubmitButton>
      </form>
    </Form>
  )
}

export default CreatePasswordForm
