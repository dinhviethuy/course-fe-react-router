import http from '~/lib/http'
import type {
  CreateOrderBodyType,
  CreateOrderResType,
  GetOrderDetailResType,
  GetOrderListQueryType,
  GetOrderListResType,
  GetOrderParamType
} from '~/types/order.type'
import type { SuccessResponse } from '~/types/success.type'

const orderApi = {
  getOrder: (query?: GetOrderListQueryType) => {
    const { page, limit, status, getAll } = query || {}
    const params = new URLSearchParams()
    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())
    if (status) params.append('status', status)
    if (getAll) params.append('getAll', getAll.toString())
    return http.get<SuccessResponse<GetOrderListResType>>(`/orders?${params.toString()}`)
  },
  getOrderDetail: (params: GetOrderParamType) =>
    http.get<SuccessResponse<GetOrderDetailResType>>(`/orders/${params.orderId}`),
  createOrder: (body: CreateOrderBodyType) => http.post<SuccessResponse<CreateOrderResType>>('/orders', body),
  cancelOrder: (params: GetOrderParamType) => http.put<SuccessResponse<boolean>>(`/orders/${params.orderId}`)
}

export default orderApi
