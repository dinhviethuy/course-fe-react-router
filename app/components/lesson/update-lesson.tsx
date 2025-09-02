import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Lesson from '~/components/lesson/lesson'
import { type FileMetadata } from '~/hooks/use-file-upload'
import { useGetLessonDetailAdminQuery, useUpdateLessonMutation } from '~/hooks/useLesson'
import { useInitVideoMutation, useUploadVideoByNameMutation } from '~/hooks/useMedia'
import { videoSocket } from '~/lib/socket'
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
    getValues,
    setError
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

  const initVideoMutation = useInitVideoMutation()
  const uploadVideoByNameMutation = useUploadVideoByNameMutation()
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

  useEffect(() => {
    if (!lessonDetail) return
    videoSocket.on('duration', () => {
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      toast.success('Độ dài video đã được cập nhật')
    })

  }, [queryClient, courseId, lessonDetail])

  if (isPending || !lessonDetail) return null

  const lesson = lessonDetail.data.data

  const onSubmit = async () => {
    try {
      if (file) {
        const init = await initVideoMutation.mutateAsync((file as File).name)
        const { url } = init.data.data
        setValue('videoUrl', url)
        setValue('duration', 0)
        const filename = url.split('/').pop() as string
        const formData = new FormData()
        formData.append('files', file as File)
        uploadVideoByNameMutation.mutate({ filename, body: formData })
      }
      const body = getValues()
      await updateLessonMutation.mutateAsync({
        param: {
          lessonId: lessonIdQuery
        },
        body: {
          ...body,
          description: body.description ?? '',
          isDraft: body.isDraft ?? true,
          duration: body.duration ?? 0,
          chapterId: lesson.chapterId
        }
      })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      toast.success('Cập nhật bài học thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }



  return (
    <Lesson
      control={control as any}
      errors={errors}
      lesson={lesson}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register as any}
      setValue={setValue as any}
      setFile={setFile}
      lessonIdPrev={lessonIdPrev}
      lessonIdNext={lessonIdNext}
      buttonText='Cập nhật bài học'
      isPending={updateLessonMutation.isPending || initVideoMutation.isPending || uploadVideoByNameMutation.isPending}
      disabled={disabled}
    />
  )
}
