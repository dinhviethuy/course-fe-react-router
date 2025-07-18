import http from '~/lib/http'
import type { GetValidateCouponBodyType, GetValidateCouponResType } from '~/types/coupon.type'
import type { SuccessResponse } from '~/types/success.type'

const couponApi = {
  validateCoupon: (body: GetValidateCouponBodyType) =>
    http.post<SuccessResponse<GetValidateCouponResType>>('/coupons/validate', body)
}

export default couponApi
