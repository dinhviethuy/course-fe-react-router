import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { useState } from "react"
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { UserStatus, type UserStatusType } from "~/constants/user.constant"
import { cn } from "~/lib/utils"
import type { CreateUserBodyType, UpdateUserBodyType } from "~/types/user.type"

type UserType = CreateUserBodyType | UpdateUserBodyType

interface IProps {
  children: React.ReactElement,
  boxTitle: string,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  roles: {
    id: number,
    name: string
  }[],
  handleSubmit: UseFormHandleSubmit<UserType>,
  onSubmit: (body: UserType) => void
  register: UseFormRegister<UserType>,
  errors: FieldErrors<UserType>
  watch: UseFormWatch<UserType>
  setValue: UseFormSetValue<UserType>
  isPending: boolean,
  reset: UseFormReset<UserType>
  disabled?: boolean,
  tooltipText: string
}

export function User({ children, boxTitle, roles, handleSubmit, onSubmit, register, errors, setValue, watch, isPending, isOpen, setIsOpen, reset, disabled, tooltipText }: IProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) reset()
      setIsOpen(open)
    }}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              {children}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className='dark px-2 py-1 text-xs'>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className={cn("sm:max-w-[520px]", disabled && "pointer-events-none")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{boxTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-8">
            <div className="grid gap-3">
              <Label htmlFor="fullname">Tên người dùng</Label>
              <Input type="text" id="fullname" required {...register('fullName')} disabled={disabled} placeholder="Nguyễn Văn A" />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required {...register('email')} disabled={disabled} placeholder="name@example.com" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className={cn('grid gap-3 relative', {
              'hidden': disabled
            })}>
              <Label htmlFor="password">Mật khẩu</Label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Mật khẩu'
                  className='h-10'
                  {...register('password')}
                  disabled={disabled}
                />
                {!showPassword ? (
                  <EyeIcon
                    className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer '
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOffIcon
                    className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 space-y-2">
                <Label htmlFor="role-1">Vai trò</Label>
                <Select
                  onValueChange={(value) => setValue('roleId', Number(value))}
                  value={watch('roleId')?.toString()} // để Select biết giá trị đã chọn
                  disabled={disabled}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.roleId && <p className="text-red-500">{errors.roleId.message}</p>}
              </div>
              <div className="col-span-1 space-y-2">
                <Label htmlFor="status-1">Trạng thái</Label>
                <Select defaultValue={watch('status')} required onValueChange={(value) => setValue('status', value as UserStatusType)} disabled={disabled}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserStatus.ACTIVE} className='flex items-center gap-2'>
                      <span
                        className={cn("size-1.5 rounded-full bg-emerald-500")}
                        aria-hidden="true"
                      ></span>
                      Hoạt động
                    </SelectItem>
                    <SelectItem value={UserStatus.BLOCKED} className='flex items-center gap-2'>
                      <span
                        className={cn("size-1.5 rounded-full bg-red-500")}
                        aria-hidden="true"
                      ></span>
                      Bị chặn
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
              </div>
            </div>
          </div>
          <DialogFooter className={cn("mt-2", disabled && "hidden")}>
            <DialogClose asChild className="cursor-pointer">
              <Button variant="outline" onClick={() => reset()}>Thoát</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {isPending && <Loader2Icon className="animate-spin" />}
              Lưu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
