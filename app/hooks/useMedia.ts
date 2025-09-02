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

export const useInitVideoMutation = () => {
  return useMutation({
    mutationFn: (originalName: string) => mediaApi.initVideo(originalName)
  })
}

export const useUploadVideoByNameMutation = () => {
  return useMutation({
    mutationFn: ({ filename, body }: { filename: string; body: FormData }) => {
      body.append('filename', filename)
      return mediaApi.uploadVideoByName(filename, body)
    }
  })
}
