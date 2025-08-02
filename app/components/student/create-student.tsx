import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Student from "~/components/student/student";
import { Button } from "~/components/ui/button";
import { CourseEnrollmentStatus } from "~/constants/course-enrollment.constant";
import { useListCourseAdminQuery } from "~/hooks/useCourse";
import { useCreateStudentMutation, useListStudentQuery } from "~/hooks/useStudent";
import { useListUserQuery } from "~/hooks/useUser";
import { handleError } from "~/lib/utils";
import { CreateCourseEnrollmentBodySchema, type CreateCourseEnrollmentBodyType } from "~/types/student.type";

export default function CreateStudent() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: listUser } = useListUserQuery({
    getAll: true
  })
  const { data: listCourse } = useListCourseAdminQuery({
    getAll: true,
  })
  const { handleSubmit, formState: { errors }, watch, control, setValue, reset, setError } = useForm({
    defaultValues: {
      userIds: [],
      courseId: undefined,
      status: CourseEnrollmentStatus.ACTIVE,
    },
    resolver: zodResolver(CreateCourseEnrollmentBodySchema)
  })
  const { data: listStudent } = useListStudentQuery({
    getAll: true,
    courseId: watch('courseId'),
    status: CourseEnrollmentStatus.ACTIVE
  })

  const queryClient = useQueryClient()
  const createStudentMutation = useCreateStudentMutation()

  const handleReset = () => {
    reset({
      userIds: [],
      courseId: undefined,
      status: CourseEnrollmentStatus.ACTIVE,
    })
  }

  const onSubmit = async (body: CreateCourseEnrollmentBodyType) => {
    try {
      await createStudentMutation.mutateAsync(body)
      queryClient.refetchQueries({ queryKey: ['students'] })
      handleReset()
      setIsOpen(false)
      toast.success('Thêm học viên thành công')
    } catch (error) {
      handleError({
        error,
        setError
      })
    }
  }

  useEffect(() => {
    const courseId = watch('courseId')
    if (courseId) {
      reset({
        userIds: listStudent?.data.data.courseEnrollments.map(item => item.user.id) || [],
        courseId,
        status: CourseEnrollmentStatus.ACTIVE,
      });
    }
  }, [reset, listStudent, watch]);



  return (
    <Student
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setValue={setValue as any}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      watch={watch as any}
      errors={errors}
      isPending={false}
      titleBox="Thêm học viên"
      reset={handleReset}
      disabled={false}
      tooltipText="Thêm học viên"
      control={control as any}
      listCourse={listCourse?.data.data.courses || []}
      listUser={listUser?.data.data.users || []}
    >
      <Button className="cursor-pointer">
        Thêm học viên
      </Button>
    </Student>
  )
}