import { useMutation, useQuery } from '@tanstack/react-query'
import studentApi from '~/apis/students.api'
import type {
  CreateCourseEnrollmentBodyType,
  GetCourseEnrollmentParamsType,
  GetCourseEnrollmentQueryType,
  UpdateCourseEnrollmentBodyType
} from '~/types/student.type'

export const useCreateStudentMutation = () => {
  return useMutation({
    mutationFn: (body: CreateCourseEnrollmentBodyType) => studentApi.createStudent(body)
  })
}

export const useDetailStudentQuery = (params: GetCourseEnrollmentParamsType) => {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => studentApi.detailStudent(params)
  })
}

export const useListStudentQuery = (query?: GetCourseEnrollmentQueryType) => {
  return useQuery({
    queryKey: ['students', query],
    queryFn: () => studentApi.listStudent(query)
  })
}

export const useUpdateStudentMutation = () => {
  return useMutation({
    mutationFn: ({ params, body }: { params: GetCourseEnrollmentParamsType; body: UpdateCourseEnrollmentBodyType }) =>
      studentApi.updateStudent(params, body)
  })
}

export const useDeleteStudentMutation = () => {
  return useMutation({
    mutationFn: (params: GetCourseEnrollmentParamsType) => studentApi.deleteStudent(params)
  })
}
