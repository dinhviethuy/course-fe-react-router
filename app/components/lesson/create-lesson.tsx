import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { default as Lesson } from '~/components/lesson/lesson'
import { type FileMetadata } from '~/hooks/use-file-upload'
import { useCreateLessonMutation } from '~/hooks/useLesson'
import { useUploadVideoMutation } from '~/hooks/useMedia'
import { handleError } from '~/lib/utils'
import { CreateLessonBodySchema } from '~/types/lesson.type'

interface Iprops {
  chapterIdQuery: number
  courseId: number
}

export default function CreateLesson({ chapterIdQuery, courseId }: Iprops) {
  const [file, setFile] = useState<File | FileMetadata | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    setError
  } = useForm({
    defaultValues: {
      description: '',
      duration: 0,
      isDraft: true,
      title: '',
      videoUrl: null
    },
    resolver: zodResolver(
      CreateLessonBodySchema.pick({
        title: true,
        description: true,
        videoUrl: true,
        isDraft: true,
        duration: true
      })
    )
  })

  const uploadVideoMutation = useUploadVideoMutation()
  const createLessonMutation = useCreateLessonMutation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const onSubmit = async () => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('files', file as File)
        const res = await uploadVideoMutation.mutateAsync(formData)
        setValue('videoUrl', res.data.data[0].url)
        setValue('duration', res.data.data[0].duration)
      } else setValue('videoUrl', null)
      // Đảm bảo description luôn là string, không phải undefined
      const body = getValues()
      const lessonBody = {
        ...body,
        description: body.description ?? '',
        isDraft: body.isDraft ?? true,
        duration: body.duration ?? 0,
        chapterId: chapterIdQuery
      }
      const res = await createLessonMutation.mutateAsync(lessonBody)
      navigate(`/admin/courses/edit/${courseId}?lessonId=${res.data.data.id}`, {
        preventScrollReset: true
      })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      toast.success('Tạo bài học mới thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }

  return (
    <Lesson
      control={control as any}
      errors={errors}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register as any}
      setValue={setValue as any}
      setFile={setFile}
      buttonText='Tạo ngay'
      isPending={createLessonMutation.isPending}
    />
  )
}
