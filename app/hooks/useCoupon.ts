import { useMutation, useQuery } from '@tanstack/react-query'
import couponApi from '~/apis/coupon.api'
import type {
  CreateCouponBodyType,
  GetCouponParamsType,
  GetCouponsQueryType,
  GetValidateCouponBodyType,
  UpdateCouponBodyType
} from '~/types/coupon.type'

export const useValidateCouponMutation = () => {
  return useMutation({
    mutationFn: (body: GetValidateCouponBodyType) => couponApi.validateCoupon(body)
  })
}

export const useGetCouponsQuery = (query?: GetCouponsQueryType) => {
  return useQuery({
    queryKey: ['coupons', query],
    queryFn: () => couponApi.getCoupons(query)
  })
}

export const useGetCouponDetailQuery = (param: GetCouponParamsType) => {
  return useQuery({
    queryKey: ['coupon', param],
    queryFn: () => couponApi.detailCoupon(param)
  })
}

export const useCreateCouponMutation = () => {
  return useMutation({
    mutationFn: (body: CreateCouponBodyType) => couponApi.createCoupon(body)
  })
}

export const useUpdateCouponMutation = () => {
  return useMutation({
    mutationFn: ({ param, body }: { param: GetCouponParamsType; body: UpdateCouponBodyType }) =>
      couponApi.updateCoupon({ param, body })
  })
}

export const useDeleteCouponMutation = () => {
  return useMutation({
    mutationFn: (param: GetCouponParamsType) => couponApi.deleteCoupon(param)
  })
}
