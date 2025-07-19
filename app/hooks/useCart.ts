import { useMutation, useQuery } from '@tanstack/react-query'
import cartApi from '~/apis/cart.api'
import type { CreateCartBodyType, GetCartParamsType, GetCartQueryType } from '~/types/cart.type'

export const useGetListCart = (query?: GetCartQueryType) => {
  return useQuery({
    queryKey: ['cart', query],
    queryFn: () => cartApi.getCart(query)
  })
}

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: (body: CreateCartBodyType) => cartApi.addToCart(body)
  })
}

export const useDeleteCartMutation = () => {
  return useMutation({
    mutationFn: (params: GetCartParamsType) => cartApi.deleteCart(params)
  })
}
