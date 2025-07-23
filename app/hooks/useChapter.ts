import { useMutation } from '@tanstack/react-query'
import chapterApi from '~/apis/chapter.api'
import type { CreateChapterBodyType, GetChapterParamsType, UpdateChatperBodyType } from '~/types/chapter.type'

export const useCreateChapterMutation = () => {
  return useMutation({
    mutationFn: (body: CreateChapterBodyType) => chapterApi.createChapter(body)
  })
}

export const useUpdateChapterMutation = () => {
  return useMutation({
    mutationFn: ({ param, body }: { param: GetChapterParamsType; body: UpdateChatperBodyType }) =>
      chapterApi.updateChapter(param, body)
  })
}

export const useDeleteChapterMutation = () => {
  return useMutation({
    mutationFn: (param: GetChapterParamsType) => chapterApi.deleteChapter(param)
  })
}
