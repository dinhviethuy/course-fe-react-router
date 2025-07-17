import { useMutation, useQuery } from '@tanstack/react-query'
import courseApi from '~/apis/course.api'
import type { CanAccessCourseBodyType, GetCourseParamsIdType, GetCourseParamsSlugType } from '~/types/course.type'

export const useCanAccessCourseMutation = () => {
  return useMutation({
    mutationFn: (body: CanAccessCourseBodyType) => courseApi.canAccessCourse(body)
  })
}

export const useGetCourseDetailBySlugQuery = (param: GetCourseParamsSlugType) => {
  return useQuery({
    queryKey: ['course-detail-by-slug', param],
    queryFn: () => courseApi.getCourseDetailBySlug(param)
  })
}

export const useGetCourseDetailByIdQuery = (param: GetCourseParamsIdType) => {
  return useQuery({
    queryKey: ['course-detail-by-id', param],
    queryFn: () => courseApi.getCourseDetailById(param)
  })
}
