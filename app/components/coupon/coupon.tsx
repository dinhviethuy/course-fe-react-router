import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Controller, type Control, type FieldErrors, type FormState, type UseFormHandleSubmit, type UseFormRegister, type UseFormReset, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import NumberCustom from "~/components/ui-custom/number-custom";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { CouponType } from "~/constants/counpon.constant";
import { cn } from "~/lib/utils";
import type { CreateCouponBodyType, UpdateCouponBodyType } from "~/types/coupon.type";

interface IProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  setValue: UseFormSetValue<CreateCouponBodyType | UpdateCouponBodyType>,
  handleSubmit: UseFormHandleSubmit<CreateCouponBodyType | UpdateCouponBodyType>,
  onSubmit: (data: CreateCouponBodyType | UpdateCouponBodyType) => void,
  register: UseFormRegister<CreateCouponBodyType | UpdateCouponBodyType>,
  watch: UseFormWatch<CreateCouponBodyType | UpdateCouponBodyType>,
  control: Control<CreateCouponBodyType | UpdateCouponBodyType>,
  errors: FieldErrors<CreateCouponBodyType | UpdateCouponBodyType>,
  isPending: boolean,
  titleBox: string,
  children: React.ReactElement,
  reset: UseFormReset<CreateCouponBodyType | UpdateCouponBodyType>,
  disabled?: boolean
  tooltipText: string,
  createdBy?: {
    fullName: string,
    email: string
  } | null,
  formState?: FormState<CreateCouponBodyType | UpdateCouponBodyType>
}

export default function Coupon({
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
  control,
  createdBy,
  formState
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
                <Label htmlFor="code">Mã</Label>
                <Input id="code" {...register('code')} required disabled={disabled} placeholder="Nhập mã" />
                {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
              </div>
              <div className="space-y-2">
                <NumberCustom
                  minValue={0}
                  maxValue={watch('couponType') === CouponType.PERCENT ? 100 : undefined}
                  label='Giảm giá '
                  control={control}
                  name='discount'
                  disabled={disabled}
                  custom={{
                    name: 'discount',
                    suffix: watch('couponType') === CouponType.PERCENT ? '%' : undefined,
                    groupSeparator: watch('couponType') === CouponType.FIXED ? ',' : undefined,
                    allowDecimals: false,
                    allowNegativeValue: false,
                    step: watch('couponType') === CouponType.PERCENT ? 1 : 1000,
                    min: 0,
                    max: watch('couponType') === CouponType.PERCENT ? 100 : undefined,
                    intlConfig: watch('couponType') === CouponType.FIXED ? {
                      locale: 'vi-VN',
                      currency: 'VND'
                    } : undefined
                  }}
                />
                {errors.discount && (
                  <p className="text-sm text-red-500">{errors.discount.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="startAt">Ngày bắt đầu và kết thúc</Label>
                <Popover>
                  <PopoverTrigger asChild disabled={disabled}>
                    <Button
                      disabled={disabled}
                      id="startAt"
                      variant="outline"
                      className="group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                    >
                      <span
                        className={cn("truncate", (!watch('startAt') || !watch('endAt')) && "text-muted-foreground")}
                      >
                        {watch('startAt') && watch('endAt') ? (
                          watch('endAt') ? (
                            <>
                              {format(watch('startAt'), "dd/MM/yyyy")} -{" "}
                              {format(watch('endAt'), "dd/MM/yyyy")}
                            </>
                          ) : (
                            format(watch('startAt'), "dd/MM/yyyy")
                          )
                        ) : (
                          "Chọn ngày"
                        )}
                      </span>
                      <CalendarIcon
                        size={16}
                        className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                        aria-hidden="true"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <Calendar
                      disabled={disabled}
                      mode="range"
                      selected={
                        watch('startAt') && watch('endAt') ? {
                          from: watch('startAt'),
                          to: watch('endAt')
                        } : undefined
                      } onSelect={(range: DateRange | undefined) => {
                        if (range) {
                          if (range.from) setValue('startAt', range.from)
                          if (range.to) setValue('endAt', range.to)
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.startAt && (
                  <p className="text-sm text-red-500">{errors.startAt.message}</p>
                )}
                {errors.endAt && (
                  <p className="text-sm text-red-500">{errors.endAt.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="couponType">Trạng thái</Label>
                <Select
                  onValueChange={(value) => {
                    setValue('couponType', value as CouponType)
                    if (value === formState?.defaultValues?.couponType) {
                      console.log(formState?.defaultValues?.discount)
                      setValue('discount', formState?.defaultValues?.discount ?? 0)
                    } else {
                      setValue('discount', 0)
                    }
                  }}
                  value={watch('couponType')}
                  disabled={disabled}
                  required
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CouponType.PERCENT}>Phần trăm</SelectItem>
                    <SelectItem value={CouponType.FIXED}>Cố định</SelectItem>
                  </SelectContent>
                </Select>
                {errors.couponType && (
                  <p className="text-sm text-red-500">{errors.couponType.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="isActive">Trạng thái</Label>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                      />
                    )}
                  />
                  <span className="text-sm text-muted-foreground">Kích hoạt mã giảm giá này</span>
                </div>
                {errors.isActive && (
                  <p className="text-sm text-red-500">{errors.isActive.message}</p>
                )}
              </div>
            </div>
          </div>
          {createdBy && (
            <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground space-y-0.5">
              <div className="flex gap-1">
                <span>Người tạo:</span>
                <span className="font-medium text-foreground">{createdBy?.fullName}</span>
              </div>
              <div className="flex gap-1">
                <span>Email:</span>
                <span className="font-medium text-foreground">{createdBy?.email}</span>
              </div>
            </div>
          )}
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
