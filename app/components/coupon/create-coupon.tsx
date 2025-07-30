import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Coupon from "~/components/coupon/coupon";
import { Button } from "~/components/ui/button";
import { CouponType } from "~/constants/counpon.constant";
import { useCreateCouponMutation } from "~/hooks/useCoupon";
import { handleError } from "~/lib/utils";
import { CreateCouponBodySchema, type CreateCouponBodyType } from "~/types/coupon.type";


export default function CreateCoupon() {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue, handleSubmit, register, formState: { errors }, reset, watch, setError, control } = useForm({
    defaultValues: {
      code: undefined,
      couponType: CouponType.PERCENT,
      discount: undefined,
      endAt: undefined,
      isActive: true,
      startAt: undefined,
    },
    resolver: zodResolver(CreateCouponBodySchema)
  })
  const queryClient = useQueryClient()
  const createCouponMutation = useCreateCouponMutation()
  const onSubmit = async (data: CreateCouponBodyType) => {
    try {
      await createCouponMutation.mutateAsync(data)
      queryClient.refetchQueries({ queryKey: ['coupons'] })
      reset()
      setIsOpen(false)
      toast.success('Tạo mã giảm giá thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }
  return (
    <Coupon
      handleSubmit={handleSubmit as any}
      onSubmit={onSubmit}
      register={register as any}
      setValue={setValue as any}
      errors={errors as any}
      isPending={createCouponMutation.isPending}
      titleBox="Tạo mã giảm giá"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Tạo mã giảm giá"
      watch={watch as any}
      control={control as any}
    >
      <Button className="cursor-pointer">
        <PlusCircle className="w-4 h-4" />
        Tạo mã giảm giá
      </Button>
    </Coupon >
  )
}
