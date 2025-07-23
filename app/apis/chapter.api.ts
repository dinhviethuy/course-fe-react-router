import http from '~/lib/http'
import type {
  CreateChapterBodyType,
  CreateChapterResType,
  GetChapterParamsType,
  UpdateChapterResType,
  UpdateChatperBodyType
} from '~/types/chapter.type'
import type { SuccessResponse } from '~/types/success.type'

const chapterApi = {
  createChapter: (body: CreateChapterBodyType) => http.post<SuccessResponse<CreateChapterResType>>('/chapters', body),
  updateChapter: (param: GetChapterParamsType, body: UpdateChatperBodyType) =>
    http.put<SuccessResponse<UpdateChapterResType>>(`/chapters/${param.chapterId}`, body),
  deleteChapter: (param: GetChapterParamsType) => http.delete<SuccessResponse<boolean>>(`/chapters/${param.chapterId}`)
}

export default chapterApi
