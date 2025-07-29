import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import Course from '~/components/course/course'
import { CourseType } from '~/constants/course.constant'
import { useFileUpload, type FileMetadata } from '~/hooks/use-file-upload'
import { useCreateCourseMutation } from '~/hooks/useCourse'
import { useUploadImageMutation } from '~/hooks/useMedia'
import { handleError } from '~/lib/utils'
import { CreateCourseBodySchema, type CreateCourseBodyType } from '~/types/course.type'

export default function Component() {
  const maxSizeMB = 2
  const maxSize = maxSizeMB * 1024 * 1024

  const [
    { files, isDragging, errors: errorsUploadFile },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }
  ] = useFileUpload({
    accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,image/webp',
    maxSize
  })
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const defaultValues: CreateCourseBodyType = {
    benefits: [],
    title: '',
    slug: '',
    price: 0,
    discount: 0,
    video: null,
    isDraft: true,
    description: '',
    image: '',
    courseType: 'SINGLE',
    courseIds: undefined
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
    setValue,
    getValues,
    setError,
    watch,
  } = useForm({
    defaultValues,
    resolver: zodResolver(CreateCourseBodySchema)
  })
  const uploadImageMutation = useUploadImageMutation()
  const createCourseMutation = useCreateCourseMutation()
  const navigate = useNavigate()
  const handleSubmitForm = async () => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('files', file as File)
        const res = await uploadImageMutation.mutateAsync(formData)
        setValue('image', res.data.data[0].url)
        const values = getValues()
        const course = await createCourseMutation.mutateAsync({
          ...values,
          price: values.price || 0,
          discount: values.discount || 0,
          courseIds: values.courseIds || undefined,
          isDraft: values.isDraft ?? true,
          courseType: values.courseType as 'SINGLE' | 'COMBO',
          benefits: values.benefits || []
        })
        if (values.courseType === CourseType.SINGLE) {
          navigate(`/admin/courses/edit/${course.data.data.id}`)
        } else {
          navigate(`/admin/courses`)
        }
        reset()
        toast.success('Tạo mới khóa học thành công')
      } else {
        setError('image', { message: 'Vui lòng tải lên ảnh bìa khóa học' })
      }
    } catch (error) {
      handleError({ error, setError })
    }
  }

  return (
    <Course
      control={control as any}
      errors={errors}
      reset={reset as any}
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
      setValue={setValue as any}
      setFile={setFile}
      isDirty={isDirty}
      register={register as any}
      data={defaultValues}
      buttonText='Tạo ngay'
      titleHeader='Tạo khóa học mới'
      watch={watch as any}
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
      isPending={createCourseMutation.isPending}
    />
  )
}
