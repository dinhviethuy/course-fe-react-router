import { Loader2 } from "lucide-react";
import { Controller, type Control, type FieldErrors, type UseFormHandleSubmit, type UseFormRegister, type UseFormReset, type UseFormSetValue } from "react-hook-form";
import SwitchModule from "~/components/switch-module/switch-module";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from '~/components/ui/label';
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { cn, groupByModule } from "~/lib/utils";
import type { GetPermissionsResType } from "~/types/permission.type";
import { type CreateRoleBodyType, type UpdateRoleBodyType } from "~/types/role.type";

interface IProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  permissionsIndb: GetPermissionsResType['permissions']
  permissionIds: number[]
  setValue: UseFormSetValue<CreateRoleBodyType | UpdateRoleBodyType>,
  handleSubmit: UseFormHandleSubmit<CreateRoleBodyType | UpdateRoleBodyType>,
  onSubmit: (data: CreateRoleBodyType | UpdateRoleBodyType) => void,
  register: UseFormRegister<CreateRoleBodyType | UpdateRoleBodyType>,
  errors: FieldErrors<CreateRoleBodyType | UpdateRoleBodyType>,
  control: Control<CreateRoleBodyType | UpdateRoleBodyType>,
  isPending: boolean,
  titleBox: string,
  children: React.ReactElement,
  reset: UseFormReset<CreateRoleBodyType | UpdateRoleBodyType>,
  disabled?: boolean
  tooltipText: string
}

export default function Role({
  isOpen,
  setIsOpen,
  permissionsIndb,
  permissionIds,
  setValue,
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  isPending,
  titleBox,
  children,
  reset,
  disabled,
  tooltipText
}: IProps) {
  const permissions = groupByModule(permissionsIndb);

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
                <Label htmlFor="isActive">Trạng thái</Label>
                <div className="flex items-center gap-2">
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                    )}
                  />
                  <span className="text-sm text-muted-foreground">Kích hoạt quyền này</span>
                </div>
                {errors.isActive && (
                  <p className="text-sm text-red-500">{errors.isActive.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                {...register('description')}
                disabled={disabled}
                rows={6}
                placeholder="Mô tả quyền hạn chi tiết..."
                className="resize-none min-h-36 max-h-36 overflow-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="space-y-4">
              {Object.entries(permissions).map(([module, permissions]) => (
                <div key={module}>
                  <SwitchModule
                    module={module}
                    permissions={permissions as GetPermissionsResType['permissions']}
                    permissionIds={permissionIds}
                    setValue={setValue as any}
                    disabled={disabled}
                  />
                </div>
              ))}
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
