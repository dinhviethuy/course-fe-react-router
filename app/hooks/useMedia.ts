import { useMutation } from '@tanstack/react-query'
import mediaApi from '~/apis/media.api'
import { uploadWithAzureSdk } from '~/lib/utils'

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

export const useUploadVideoSuccessMutation = () => {
  return useMutation({
    mutationFn: ({ key }: { key: string }) => mediaApi.uploadVideoSuccess(key)
  })
}

export const useGetVideoInfoMutation = () => {
  return useMutation({
    mutationFn: (key: string) => mediaApi.getVideoInfo(key)
  })
}

type UploadArgs = {
  sasUrl: string
  file: File
  onProgress?: (percent: number) => void
}

export const useUploadToAzure = () => {
  return useMutation({
    mutationFn: async ({ sasUrl, file, onProgress }: UploadArgs) => uploadWithAzureSdk(sasUrl, file, onProgress)
  })
}
