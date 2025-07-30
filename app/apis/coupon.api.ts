import http from '~/lib/http'
import type {
  CreateCouponBodyType,
  CreateCouponResType,
  GetCouponDetailResType,
  GetCouponListResType,
  GetCouponParamsType,
  GetCouponsQueryType,
  GetValidateCouponBodyType,
  GetValidateCouponResType,
  UpdateCouponBodyType,
  UpdateCouponResType
} from '~/types/coupon.type'
import type { SuccessResponse } from '~/types/success.type'

const couponApi = {
  validateCoupon: (body: GetValidateCouponBodyType) =>
    http.post<SuccessResponse<GetValidateCouponResType>>('/coupons/validate', body),
  getCoupons: (query?: GetCouponsQueryType) => {
    const searchParams = new URLSearchParams()
    if (query?.limit) searchParams.set('limit', query.limit.toString())
    if (query?.page) searchParams.set('page', query.page.toString())
    if (query?.sortBy) searchParams.set('sortBy', query.sortBy)
    if (query?.orderBy) searchParams.set('orderBy', query.orderBy)
    if (query?.search) searchParams.set('search', query.search)
    if (query?.couponType) searchParams.set('couponType', query.couponType)
    if (query?.isActive) searchParams.set('isActive', query.isActive)
    return http.get<SuccessResponse<GetCouponListResType>>(`/coupons?${searchParams.toString()}`)
  },
  detailCoupon: (param: GetCouponParamsType) =>
    http.get<SuccessResponse<GetCouponDetailResType>>(`/coupons/${param.couponId}`),
  createCoupon: (body: CreateCouponBodyType) => http.post<SuccessResponse<CreateCouponResType>>('/coupons', body),
  updateCoupon: ({ param, body }: { param: GetCouponParamsType; body: UpdateCouponBodyType }) =>
    http.put<SuccessResponse<UpdateCouponResType>>(`/coupons/${param.couponId}`, body),
  deleteCoupon: (param: GetCouponParamsType) => http.delete<SuccessResponse<boolean>>(`/coupons/${param.couponId}`)
}

export default couponApi
