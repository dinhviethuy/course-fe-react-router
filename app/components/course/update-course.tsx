import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Course from '~/components/course/course'
import { CourseType } from '~/constants/course.constant'
import { useFileUpload, type FileMetadata } from '~/hooks/use-file-upload'
import { useUpdateCourseMutaion } from '~/hooks/useCourse'
import { useUploadImageMutation } from '~/hooks/useMedia'
import { handleError } from '~/lib/utils'
import { UpdateCourseBodySchema, type GetCourseDetailResTypeForAdmin } from '~/types/course.type'

interface IProps {
  data: GetCourseDetailResTypeForAdmin
  courseId: number
  refetch: () => void
}

export default function Component({ data, courseId, refetch }: IProps) {
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const maxSizeMB = 2
  const maxSize = maxSizeMB * 1024 * 1024

  const [
    { files, isDragging, errors: errorsUploadFile },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }
  ] = useFileUpload({
    accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,image/webp',
    maxSize
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
    setValue,
    getValues,
    watch
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
    },
    resolver: zodResolver(UpdateCourseBodySchema)
  })
  const uploadImageMutation = useUploadImageMutation()
  const updateCourseMutation = useUpdateCourseMutaion()
  const handleSubmitForm = async () => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('files', file as File)
        const res = await uploadImageMutation.mutateAsync(formData)
        setValue('image', res.data.data[0].url)
      } else setValue('image', data.image)
      const updatedBody = getValues()
      await updateCourseMutation.mutateAsync({ params: { courseId }, body: updatedBody })
      refetch()
      removeFile(files[0]?.id)
      toast.success('Cập nhật khóa học thành công')
    } catch (error) {
      handleError({ error })
    }
  }

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
      watch={watch}
      buttonText='Lưu thay đổi'
      titleHeader='Thông tin khóa học'
      isUpdate
      uploadFile={{
        errors: errorsUploadFile,
        files,
        getInputProps,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        isDragging,
        maxSizeMB,
        openFileDialog,
        removeFile
      }}
      isPending={updateCourseMutation.isPending}
    />
  )
}
