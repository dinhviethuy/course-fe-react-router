import { useMutation, useQuery } from '@tanstack/react-query'
import lessonApi from '~/apis/lesson.api'
import type { CreateLessonBodyType, GetLessonParamsType, UpdateLessonBodyType } from '~/types/lesson.type'

export const useGetLessonDetailQuery = (param: GetLessonParamsType) => {
  return useQuery({
    queryKey: ['lesson-detail', param],
    queryFn: () => lessonApi.getLessonDetail(param),
    enabled: !!param.lessonId
  })
}

export const useGetLessonDetailAdminQuery = (param: GetLessonParamsType) => {
  return useQuery({
    queryKey: ['lesson-detail-admin', param],
    queryFn: () => lessonApi.getLessonDetailAdmin(param),
    enabled: !!param.lessonId
  })
}

export const useCreateLessonMutation = () => {
  return useMutation({
    mutationFn: (body: CreateLessonBodyType) => lessonApi.createLesson(body)
  })
}

export const useUpdateLessonMutation = () => {
  return useMutation({
    mutationFn: ({ param, body }: { param: GetLessonParamsType; body: UpdateLessonBodyType }) =>
      lessonApi.updateLesson(param, body)
  })
}

export const useDeleteLessonMutation = () => {
  return useMutation({
    mutationFn: (param: GetLessonParamsType) => lessonApi.deleteLesson(param)
  })
}
