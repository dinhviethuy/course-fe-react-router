import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Coupon from "~/components/coupon/coupon";
import { Button } from "~/components/ui/button";
import { CouponType } from "~/constants/counpon.constant";
import { useUpdateCouponMutation } from "~/hooks/useCoupon";
import { handleError } from "~/lib/utils";
import { UpdateCouponBodySchema, type GetCouponListResType, type UpdateCouponBodyType } from "~/types/coupon.type";


interface IProps {
  coupon: GetCouponListResType['coupons'][number]
}

export default function UpdateCoupon({ coupon }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue, handleSubmit, register, formState, reset, watch, setError, control } = useForm({
    defaultValues: {
      code: undefined,
      couponType: CouponType.PERCENT,
      discount: undefined,
      endAt: undefined,
      isActive: true,
      startAt: undefined,
    },
    resolver: zodResolver(UpdateCouponBodySchema)
  })
  const queryClient = useQueryClient()
  const updateCouponMutation = useUpdateCouponMutation()
  const onSubmit = async (body: UpdateCouponBodyType) => {
    try {
      await updateCouponMutation.mutateAsync({
        param: {
          couponId: coupon.id
        },
        body
      })
      queryClient.refetchQueries({ queryKey: ['coupons'] })
      reset()
      setIsOpen(false)
      toast.success('Cập nhật mã giảm giá thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }

  useEffect(() => {
    reset({
      code: coupon.code,
      couponType: coupon.couponType,
      discount: coupon.discount,
      endAt: coupon.endAt,
      isActive: coupon.isActive,
      startAt: coupon.startAt,
    })
  }, [coupon, reset])
  return (
    <Coupon
      handleSubmit={handleSubmit as any}
      onSubmit={onSubmit}
      register={register as any}
      setValue={setValue as any}
      errors={formState.errors as any}
      isPending={updateCouponMutation.isPending}
      titleBox="Cập nhật mã giảm giá"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Cập nhật mã giảm giá"
      watch={watch as any}
      control={control as any}
      createdBy={coupon.createdBy}
      formState={formState as any}
    >
      <Button className="cursor-pointer" variant='ghost'>
        <PencilLine />
      </Button>
    </Coupon >
  )
}
