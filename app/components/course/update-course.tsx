import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Course from "~/components/course/course"
import type { FileMetadata } from "~/hooks/use-file-upload"
import { UpdateCourseBodySchema, type UpdateCourseBodyType } from "~/types/course.type"

interface IProps {
  data: UpdateCourseBodyType
}

export default function Component({ data }: IProps) {
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const { register, handleSubmit, formState: { errors, isDirty }, reset, control, setValue, getValues } = useForm({
    defaultValues: {
      benefits: data.benefits,
      courseIds: data.courseIds,
      courseType: data.courseType,
      description: data.description,
      discount: data.discount,
      image: data.image,
      isDraft: data.isDraft,
      price: data.price,
      slug: data.slug,
      title: data.title,
      video: data.video
    },
    resolver: zodResolver(UpdateCourseBodySchema),
  })
  const handleSubmitForm = (body: UpdateCourseBodyType) => {
    console.log(file)
    console.log(body)
  }

  return (
    <Course
      control={control}
      errors={errors}
      reset={reset}
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
      setValue={setValue}
      setFile={setFile}
      isDirty={isDirty}
      register={register}
      data={data}
      buttonText="Lưu thay đổi"
      titleHeader="Thông tin khóa học"
      getValues={getValues}
      isUpdate
    />
  )
}