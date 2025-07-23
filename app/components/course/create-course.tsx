import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Course from "~/components/course/course"
import type { FileMetadata } from "~/hooks/use-file-upload"
import { CreateCourseBodySchema, type CreateCourseBodyType } from "~/types/course.type"

export default function Component() {
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const defaultValues: CreateCourseBodyType = {
    benefits: [],
    title: "",
    slug: "",
    price: 0,
    discount: 0,
    video: "",
    isDraft: true,
    description: "",
    image: "",
    courseType: "SINGLE",
    courseIds: undefined,
  }
  const { register, handleSubmit, formState: { errors, isDirty }, reset, control, setValue, getValues } = useForm({
    defaultValues,
    resolver: zodResolver(CreateCourseBodySchema),
  })
  const handleSubmitForm = (body: CreateCourseBodyType) => {
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
      data={defaultValues}
      buttonText="Tạo ngay"
      titleHeader="Tạo khóa học mới"
      getValues={getValues}
    />
  )
}