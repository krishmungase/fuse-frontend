import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { useResendVerification } from '@/apis'

import AuthField from '../../components/auth-field'
import AuthSubmitButton from '../../components/auth-submit-button'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

const ResendVerificationForm = ({ defaultEmail = '' }) => {
  const { isLoading, resendVerification } = useResendVerification()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: defaultEmail },
  })

  const onSubmit = (data) => resendVerification({ data })

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

        <AuthSubmitButton isLoading={isLoading}>
          Send a new link
        </AuthSubmitButton>
      </form>
    </Form>
  )
}

export default ResendVerificationForm
