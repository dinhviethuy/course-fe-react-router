import { Loader2 } from "lucide-react";
import { type FieldErrors, type UseFormHandleSubmit, type UseFormRegister, type UseFormReset, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { HTTPMethod, type HttpMethodType } from "~/constants/role.constant";
import { cn } from "~/lib/utils";
import type { CreatePermissionBodyType, UpdatePermissionBodyType } from "~/types/permission.type";

interface IProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  setValue: UseFormSetValue<CreatePermissionBodyType | UpdatePermissionBodyType>,
  handleSubmit: UseFormHandleSubmit<CreatePermissionBodyType | UpdatePermissionBodyType>,
  onSubmit: (data: CreatePermissionBodyType | UpdatePermissionBodyType) => void,
  register: UseFormRegister<CreatePermissionBodyType | UpdatePermissionBodyType>,
  watch: UseFormWatch<CreatePermissionBodyType | UpdatePermissionBodyType>,
  errors: FieldErrors<CreatePermissionBodyType | UpdatePermissionBodyType>,
  isPending: boolean,
  titleBox: string,
  children: React.ReactElement,
  reset: UseFormReset<CreatePermissionBodyType | UpdatePermissionBodyType>,
  disabled?: boolean
  tooltipText: string,
  modules: string[]
}

export default function Permission({
  isOpen,
  setIsOpen,
  setValue,
  handleSubmit,
  onSubmit,
  register,
  errors,
  watch,
  isPending,
  titleBox,
  children,
  reset,
  disabled,
  tooltipText,
  modules
}: IProps) {

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
      <DialogContent className={cn("flex flex-col gap-0 overflow-y-visible p-0 [&>button:last-child]:top-3.5 sm:max-w-xl md:max-w-3xl", disabled && "pointer-events-none")}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b px-6 py-4 text-base">
              {titleBox}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-8 p-6 overflow-y-auto max-h-[calc(100vh-200px)] overflow-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tên</Label>
                <Input id="name" {...register('name')} required disabled={disabled} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="path">Đường dẫn</Label>
                <Input id="name" {...register('path')} required disabled={disabled} />
                {errors.path && (
                  <p className="text-sm text-red-500">{errors.path.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Phương thức</Label>
                <Select
                  onValueChange={(value) => setValue('method', value as HttpMethodType)}
                  value={watch('method')}
                  disabled={disabled}
                  required
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(HTTPMethod).map((method) => (
                      <SelectItem key={method} value={method} className="cursor-pointer">
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.method && (
                  <p className="text-sm text-red-500">{errors.method.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="module">Module</Label>
                <Select
                  onValueChange={(value) => setValue('module', value as string)}
                  value={watch('module')}
                  disabled={disabled}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module} value={module} className="cursor-pointer">
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.module && (
                  <p className="text-sm text-red-500">{errors.module.message}</p>
                )}
              </div>
            </div>

          </div>
          <DialogFooter className={cn("border-t px-6 py-4", {
            "hidden": disabled
          })}>
            <DialogClose asChild className="cursor-pointer">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending && <Loader2 className="animate-spin" />}
              Lưu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}
