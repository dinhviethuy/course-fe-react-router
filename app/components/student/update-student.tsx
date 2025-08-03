import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Student from "~/components/student/student";
import { Button } from "~/components/ui/button";
import { useListCourseAdminQuery } from "~/hooks/useCourse";
import { useUpdateStudentMutation } from "~/hooks/useStudent";
import { useListUserQuery } from "~/hooks/useUser";
import { handleError } from "~/lib/utils";
import { UpdateCourseEnrollmentBodySchema, type GetCourseEnrollmentListResType, type UpdateCourseEnrollmentBodyType } from "~/types/student.type";

interface IProps {
  data: GetCourseEnrollmentListResType['courseEnrollments'][number]
}

export default function UpdateStudent({ data }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: listUser } = useListUserQuery({
    getAll: true
  })
  const { data: listCourse } = useListCourseAdminQuery({
    getAll: true,
  })
  const { handleSubmit, formState: { errors }, watch, control, setValue, reset, setError } = useForm({
    defaultValues: {
      userId: data.userId,
      courseId: data.courseId,
      status: data.status,
    },
    resolver: zodResolver(UpdateCourseEnrollmentBodySchema)
  })

  const handleReset = () => {
    reset()
  }

  const queryClient = useQueryClient()
  const updateStudentMutation = useUpdateStudentMutation()
  const onSubmit = async (body: UpdateCourseEnrollmentBodyType) => {
    try {
      await updateStudentMutation.mutateAsync({
        params: {
          courseEnrollmentId: data.id
        },
        body
      })
      queryClient.refetchQueries({ queryKey: ['students'] })
      setIsOpen(false)
      toast.success('Cập nhật học viên thành công')
    } catch (error) {
      handleError({
        error,
        setError
      })
    }
  }

  return (
    <Student
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setValue={setValue as any}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit as any}
      watch={watch as any}
      errors={errors}
      isPending={updateStudentMutation.isPending}
      titleBox="Cập nhật học viên"
      reset={handleReset}
      tooltipText="Cập nhật học viên"
      control={control as any}
      listCourse={listCourse?.data.data.courses || []}
      listUser={listUser?.data.data.users || []}
      isCreate={false}
    >
      <Button className="cursor-pointer" variant='ghost'>
        <PencilLine />
      </Button>
    </Student>
  )
}