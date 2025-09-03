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
    ),
  uploadVideoSuccess: (key: string) => http.post<SuccessResponse<boolean>>('media/videos/upload-success', { key }),
  generateWriteSasUrl: (filename: string) =>
    http.post<SuccessResponse<string>>('media/videos/generate-write-sas-url', { filename }),
  getVideoInfo: (key: string) => http.post<SuccessResponse<number>>('media/videos/get-video-info', { key })
}

export default mediaApi
