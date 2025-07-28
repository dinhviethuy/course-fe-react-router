import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Lesson from '~/components/lesson/lesson'
import { type FileMetadata } from '~/hooks/use-file-upload'
import { useGetLessonDetailAdminQuery, useUpdateLessonMutation } from '~/hooks/useLesson'
import { useUploadVideoMutation } from '~/hooks/useMedia'
import { handleError } from '~/lib/utils'
import { UpdateLessonBodySchema } from '~/types/lesson.type'

interface Iprops {
  lessonIdQuery: number
  chapterIdQuery: number
  lessonIdPrev: number | undefined
  lessonIdNext: number | undefined
  courseId: number
  disabled?: boolean
}

export default function UpdateLesson({ lessonIdQuery, courseId, lessonIdPrev, lessonIdNext, disabled }: Iprops) {
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const { data: lessonDetail, isPending } = useGetLessonDetailAdminQuery({
    lessonId: lessonIdQuery
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(
      UpdateLessonBodySchema.pick({
        title: true,
        description: true,
        videoUrl: true,
        isDraft: true,
        duration: true
      })
    )
  })

  const uploadVideoMutation = useUploadVideoMutation()
  const updateLessonMutation = useUpdateLessonMutation()
  const queryClient = useQueryClient()

  useEffect(() => {
    reset({
      title: lessonDetail?.data.data.title,
      description: lessonDetail?.data.data.description,
      videoUrl: lessonDetail?.data.data.videoUrl,
      isDraft: lessonDetail?.data.data.isDraft,
      duration: lessonDetail?.data.data.duration
    })
  }, [lessonDetail, reset])


  if (isPending || !lessonDetail) return null

  const lesson = lessonDetail.data.data

  const onSubmit = async () => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('files', file as File)
        const res = await uploadVideoMutation.mutateAsync(formData)
        setValue('videoUrl', res.data.data[0].url)
        setValue('duration', res.data.data[0].duration)
      }
      const body = getValues()
      await updateLessonMutation.mutateAsync({
        param: {
          lessonId: lessonIdQuery
        },
        body: {
          ...body,
          chapterId: lesson.chapterId
        }
      })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      toast.success('Cập nhật bài học thành công')
    } catch (error) {
      handleError({ error })
    }
  }

  return (
    <Lesson
      control={control}
      errors={errors}
      lesson={lesson}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      setValue={setValue}
      setFile={setFile}
      lessonIdPrev={lessonIdPrev}
      lessonIdNext={lessonIdNext}
      buttonText='Cập nhật bài học'
      isPending={updateLessonMutation.isPending}
      disabled={disabled}
    />
  )
}
