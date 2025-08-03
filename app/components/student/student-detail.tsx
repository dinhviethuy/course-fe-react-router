import { Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Student from "~/components/student/student";
import { Button } from "~/components/ui/button";
import { useListCourseAdminQuery } from "~/hooks/useCourse";
import { useListUserQuery } from "~/hooks/useUser";
import { type GetCourseEnrollmentListResType } from "~/types/student.type";

interface IProps {
  data: GetCourseEnrollmentListResType['courseEnrollments'][number]
}

export default function StudentDetail({ data }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: listUser } = useListUserQuery({
    getAll: true
  })
  const { data: listCourse } = useListCourseAdminQuery({
    getAll: true,
  })
  const { handleSubmit, formState: { errors }, watch, control, setValue } = useForm({
    defaultValues: {
      userId: data.userId,
      courseId: data.courseId,
      status: data.status,
    },
  })

  return (
    <Student
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setValue={setValue as any}
      handleSubmit={handleSubmit}
      onSubmit={() => { }}
      watch={watch as any}
      errors={errors}
      isPending={false}
      titleBox="Chi tiết học viên"
      reset={() => { }}
      tooltipText="Chi tiết học viên"
      control={control as any}
      listCourse={listCourse?.data.data.courses || []}
      listUser={listUser?.data.data.users || []}
      isCreate={false}
      disabled
    >
      <Button className="cursor-pointer" variant='ghost'>
        <Eye />
      </Button>
    </Student>
  )
}