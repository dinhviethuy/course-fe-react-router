import { useMutation } from '@tanstack/react-query'
import couponApi from '~/apis/coupon.api'
import type { GetValidateCouponBodyType } from '~/types/coupon.type'

export const useValidateCouponMutation = () => {
  return useMutation({
    mutationFn: (body: GetValidateCouponBodyType) => couponApi.validateCoupon(body)
  })
}
