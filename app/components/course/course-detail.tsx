import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Course from '~/components/course/course'
import { CourseType } from '~/constants/course.constant'
import { type GetCourseDetailResTypeForAdmin } from '~/types/course.type'

interface IProps {
  data: GetCourseDetailResTypeForAdmin
  courseId: number
  refetch: () => void
}

export default function CourseDetail({ data }: IProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
    setValue,
    watch,
    getValues
  } = useForm({
    defaultValues: {
      benefits: data.benefits,
      courseIds: data.courseType === CourseType.COMBO ? data.comboChildren.map((item) => item.id) : undefined,
      courseType: data.courseType,
      description: data.description,
      discount: data.discount,
      image: data.image,
      isDraft: data.isDraft,
      price: data.price,
      slug: data.slug,
      title: data.title,
      video: data.video
    }
  })

  useEffect(() => {
    reset({
      benefits: data.benefits,
      courseIds: data.courseType === CourseType.COMBO ? data.comboChildren.map((item) => item.id) : undefined,
      courseType: data.courseType,
      description: data.description,
      discount: data.discount,
      image: data.image,
      isDraft: data.isDraft,
      price: data.price,
      slug: data.slug,
      title: data.title,
      video: data.video
    })
  }, [data, reset])

  return (
    <Course
      control={control as any}
      getValues={getValues as any}
      errors={errors}
      reset={reset as any}
      handleSubmit={handleSubmit}
      handleSubmitForm={() => { }}
      setValue={setValue as any}
      setFile={() => { }}
      isDirty={isDirty}
      register={register as any}
      data={data}
      watch={watch as any}
      titleHeader='Thông tin khóa học'
      isUpdate={false}
      disabled
      isPending={false}
    />
  )
}
