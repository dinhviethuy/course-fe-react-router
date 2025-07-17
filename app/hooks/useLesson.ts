import { useQuery } from '@tanstack/react-query'
import lessonApi from '~/apis/lesson.api'
import type { GetLessonParamsType } from '~/types/lesson.type'

export const useGetLessonDetailQuery = (param: GetLessonParamsType) => {
  return useQuery({
    queryKey: ['lesson-detail', param],
    queryFn: () => lessonApi.getLessonDetail(param),
    enabled: !!param.lessonId
  })
}
