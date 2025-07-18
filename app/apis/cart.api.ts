import http from '~/lib/http'
import type {
  CreateCartBodyType,
  CreateCartResType,
  GetCartParamsType,
  GetCartQueryType,
  GetListCartResType
} from '~/types/cart.type'
import type { SuccessResponse } from '~/types/success.type'

const cartApi = {
  getCart: (query?: GetCartQueryType) => {
    const { page, limit, orderBy, sortBy } = query || {}
    const queryString = new URLSearchParams()
    if (page) queryString.set('page', page.toString())
    if (limit) queryString.set('limit', limit.toString())
    if (orderBy) queryString.set('orderBy', orderBy)
    if (sortBy) queryString.set('sortBy', sortBy)
    return http.get<SuccessResponse<GetListCartResType>>(`/carts?${queryString.toString()}`)
  },
  addToCart: (body: CreateCartBodyType) => http.post<SuccessResponse<CreateCartResType>>(`/carts`, body),
  deleteCart: (params: GetCartParamsType) => http.delete<SuccessResponse<boolean>>(`/carts/${params.cartId}`)
}

export default cartApi
