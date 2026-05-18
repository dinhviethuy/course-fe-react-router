import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Lesson from '~/components/lesson/lesson'
import { type FileMetadata } from '~/hooks/use-file-upload'
import { useGetLessonDetailAdminQuery, useUpdateLessonMutation } from '~/hooks/useLesson'
import {
  useInitVideoMutation,
  useUploadToAzure,
  useUploadVideoByNameMutation,
  useUploadVideoMutation,
  useUploadVideoSuccessMutation
} from '~/hooks/useMedia'
import { videoSocket } from '~/lib/socket'
import { handleError } from '~/lib/utils'
import { LessonSchema } from '~/types/lesson.type'
import { LessonType } from '~/constants/lesson.constant'

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
      LessonSchema.pick({
        title: true,
        description: true,
        videoUrl: true,
        isDraft: true,
        duration: true,
        type: true
      })
    )
  })

  const initVideoMutation = useInitVideoMutation()
  const uploadVideoByNameMutation = useUploadVideoByNameMutation()
  const updateLessonMutation = useUpdateLessonMutation()
  const uploadVideoSuccessMutation = useUploadVideoSuccessMutation()
  const queryClient = useQueryClient()
  const uploadToAzureMutation = useUploadToAzure()
  const uploadVideoMutation = useUploadVideoMutation()
  useEffect(() => {
    reset({
      title: lessonDetail?.data.data.title,
      description: lessonDetail?.data.data.description,
      videoUrl: lessonDetail?.data.data.videoUrl,
      isDraft: lessonDetail?.data.data.isDraft,
      duration: lessonDetail?.data.data.duration,
      type: lessonDetail?.data.data.type
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
        // const init = await initVideoMutation.mutateAsync((file as File).name)
        // const { url, key } = init.data.data
        // setValue('videoUrl', key.split('.')[0])
        // setValue('duration', 0)
        // await uploadToAzureMutation.mutateAsync({ sasUrl: url, file: file as File })
        // await uploadVideoSuccessMutation.mutateAsync({ key })
        let body = new FormData()
        body.append('files', file as File)
        const res = await uploadVideoMutation.mutateAsync(body)
        setValue('videoUrl', res.data.data[0].key)
        toast.success('Đã bắt đầu xử lý video')
      }
      const body = getValues()
      await updateLessonMutation.mutateAsync({
        param: {
          lessonId: lessonIdQuery
        },
        body: {
          ...body,
          type: body.type ?? lesson.type ?? LessonType.CONTENT,
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
      isPending={
        updateLessonMutation.isPending ||
        initVideoMutation.isPending ||
        uploadVideoByNameMutation.isPending ||
        uploadToAzureMutation.isPending ||
        uploadVideoSuccessMutation.isPending
      }
      disabled={disabled}
    />
  )
}
