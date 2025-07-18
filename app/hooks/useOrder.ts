import { useMutation, useQuery } from '@tanstack/react-query'
import orderApi from '~/apis/order.api'
import type { CreateOrderBodyType, GetOrderListQueryType, GetOrderParamType } from '~/types/order.type'

export const useGetOrder = (query?: GetOrderListQueryType) => {
  return useQuery({
    queryKey: ['orders', query],
    queryFn: () => orderApi.getOrder(query)
  })
}

export const useGetOrderDetail = (params: GetOrderParamType) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderApi.getOrderDetail(params)
  })
}

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (body: CreateOrderBodyType) => orderApi.createOrder(body)
  })
}

export const useCancalOrderMutation = () => {
  return useMutation({
    mutationFn: (params: GetOrderParamType) => orderApi.cancelOrder(params)
  })
}
