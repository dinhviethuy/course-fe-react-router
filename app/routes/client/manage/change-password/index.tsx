import type { Route } from '.react-router/types/app/routes/client/manage/change-password/+types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm, type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useChangePasswordMutation } from '~/hooks/useUser'
import { handleError } from '~/lib/utils'
import { ChangePasswordBodySchema, type ChangePasswordBodyType } from '~/types/profile.type'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Đổi mật khẩu' }, { name: 'description', content: 'Đổi mật khẩu' }]
}

function PasswordInput({
  placeholder,
  id,
  register,
  error
}: {
  placeholder: string
  id: string
  register: UseFormRegisterReturn<string>
  error: FieldError | undefined
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className='h-10'
        id={id}
        {...register}
      />
      {showPassword ? (
        <EyeOffIcon
          className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
          onClick={handleShowPassword}
        />
      ) : (
        <EyeIcon
          className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
          onClick={handleShowPassword}
        />
      )}
      {error && <p className='text-sm text-destructive'>{error.message}</p>}
    </div>
  )
}

export default function ChangePassword() {
  const changePasswordMutation = useChangePasswordMutation()
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBodySchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  })
  const handleChangePassword = form.handleSubmit(async (data) => {
    if (changePasswordMutation.isPending) return
    try {
      await changePasswordMutation.mutateAsync(data)
      toast.success('Đổi mật khẩu thành công')
      form.reset()
    } catch (error) {
      handleError({
        error,
        setError: form.setError
      })
    }
  })
  return (
    <div>
      <h3 className='text-lg font-medium'>Đổi mật khẩu</h3>
      <div data-orientation='horizontal' role='none' className='shrink-0 bg-border h-[1px] w-full my-6' />
      <div className='space-y-8'>
        <form onSubmit={handleChangePassword} className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium' htmlFor='oldPassword'>
              Mật khẩu cũ
            </label>
            <div className='relative'>
              <PasswordInput
                placeholder='Nhập mật khẩu cũ'
                register={form.register('password')}
                error={form.formState.errors.password}
                id='oldPassword'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium' htmlFor='newPassword'>
              Mật khẩu mới
            </label>
            <PasswordInput
              placeholder='Nhập mật khẩu mới'
              id='newPassword'
              register={form.register('newPassword')}
              error={form.formState.errors.newPassword}
            />
            <p className='text-sm text-muted-foreground'>Mật khẩu mới nên có từ 6 - 100 ký tự, và khác mật khẩu cũ</p>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium' htmlFor='confirmPassword'>
              Xác nhận mật khẩu
            </label>
            <PasswordInput
              placeholder='Nhập lại mật khẩu mới'
              id='confirmPassword'
              register={form.register('confirmNewPassword')}
              error={form.formState.errors.confirmNewPassword}
            />
          </div>
          <Button className='w-auto h-[40px] cursor-pointer' type='submit'>
            {changePasswordMutation.isPending && <Loader2Icon className='animate-spin' />}
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </div>
  )
}
