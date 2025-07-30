import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Coupon from "~/components/coupon/coupon";
import { Button } from "~/components/ui/button";
import { type GetCouponListResType } from "~/types/coupon.type";


interface IProps {
  coupon: GetCouponListResType['coupons'][number]
}

export default function CouponDetail({ coupon }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue, handleSubmit, register, formState: { errors }, reset, watch, control } = useForm({
    defaultValues: {
      code: coupon.code,
      couponType: coupon.couponType,
      discount: coupon.discount,
      endAt: coupon.endAt,
      isActive: coupon.isActive,
      startAt: coupon.startAt,
    },
  })

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
      onSubmit={() => { }}
      register={register as any}
      setValue={setValue as any}
      errors={errors as any}
      isPending={false}
      titleBox="Chi tiết mã giảm giá"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      reset={reset as any}
      tooltipText="Xem chi tiết"
      watch={watch as any}
      control={control as any}
      createdBy={coupon.createdBy}
      disabled
    >
      <Button className="cursor-pointer" variant='ghost'>
        <Eye />
      </Button>
    </Coupon >
  )
}
