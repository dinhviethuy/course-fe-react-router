import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { default as Lesson } from '~/components/lesson/lesson'
import { type FileMetadata } from '~/hooks/use-file-upload'
import { useCreateLessonMutation } from '~/hooks/useLesson'
import {
  useInitVideoMutation,
  useUploadToAzure,
  useUploadVideoByNameMutation,
  useUploadVideoMutation,
  useUploadVideoSuccessMutation
} from '~/hooks/useMedia'
import { videoSocket } from '~/lib/socket'
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

  const initVideoMutation = useInitVideoMutation()
  const uploadVideoByNameMutation = useUploadVideoByNameMutation()
  const createLessonMutation = useCreateLessonMutation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const uploadVideoSuccessMutation = useUploadVideoSuccessMutation()
  const uploadVideoMutation = useUploadVideoMutation()
  const uploadToAzureMutation = useUploadToAzure()
  const onSubmit = async () => {
    try {
      if (file) {
        // // 1) init để nhận url ngay
        // const init = await initVideoMutation.mutateAsync((file as File).name)
        // const { url, key } = init.data.data
        // setValue('videoUrl', key.split('.')[0])
        // setValue('duration', 0)
        // // 2) upload nền theo filename
        // await uploadToAzureMutation.mutateAsync({ sasUrl: url, file: file as File })
        // await uploadVideoSuccessMutation.mutateAsync({ key })
        let body = new FormData()
        body.append('files', file as File)
        const res = await uploadVideoMutation.mutateAsync(body)
        setValue('videoUrl', res.data.data[0].url)

        toast.success('Đã bắt đầu xử lý video')
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
      await createLessonMutation.mutateAsync(lessonBody)
      toast.success('Tạo bài học mới thành công')
    } catch (error) {
      handleError({ error, setError })
    }
  }

  useEffect(() => {
    if (!file) return
    videoSocket.on('duration', (id: number) => {
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      navigate(`/admin/courses/edit/${courseId}?lessonId=${id}`, {
        preventScrollReset: true
      })
      toast.success('Độ dài video đã được cập nhật')
    })
  }, [queryClient, courseId, file, navigate])

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
      isPending={
        createLessonMutation.isPending ||
        initVideoMutation.isPending ||
        uploadVideoByNameMutation.isPending ||
        uploadToAzureMutation.isPending ||
        uploadVideoSuccessMutation.isPending
      }
    />
  )
}
