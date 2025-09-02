import http from '~/lib/http'
import type { UploadImageResType, UploadVideoResType } from '~/types/media.type'
import type { SuccessResponse } from '~/types/success.type'

const mediaApi = {
  uploadImage: (body: FormData) =>
    http.post<SuccessResponse<UploadImageResType[]>>('media/images/upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  uploadVideo: (body: FormData) =>
    http.post<SuccessResponse<UploadVideoResType[]>>('media/videos/upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  initVideo: (originalName: string) =>
    http.post<SuccessResponse<UploadVideoResType>>('media/videos/init', { originalName }),
  uploadVideoByName: (filename: string, body: FormData) =>
    http.post<SuccessResponse<UploadVideoResType[]>>(
      `media/videos/upload-by-name?filename=${encodeURIComponent(filename)}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
}

export default mediaApi
