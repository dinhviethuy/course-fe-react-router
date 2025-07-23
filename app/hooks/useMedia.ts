import { useMutation } from '@tanstack/react-query'
import mediaApi from '~/apis/media.api'

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (body: FormData) => mediaApi.uploadImage(body)
  })
}

export const useUploadVideoMutation = () => {
  return useMutation({
    mutationFn: (body: FormData) => mediaApi.uploadVideo(body)
  })
}
