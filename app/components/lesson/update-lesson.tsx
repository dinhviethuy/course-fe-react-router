import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Lesson from '~/components/lesson/lesson'
import { useFileUpload, type FileMetadata } from '~/hooks/use-file-upload'
import { useGetLessonDetailAdminQuery } from '~/hooks/useLesson'
import { UpdateLessonBodySchema, type UpdateLessonBodyType } from '~/types/lesson.type'

interface Iprops {
  lessonIdQuery: number
  chapterIdQuery: number
  lessonIdPrev: number | undefined
  lessonIdNext: number | undefined
}

export default function UpdateLesson({ lessonIdQuery }: Iprops) {
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const { data: lessonDetail, isPending } = useGetLessonDetailAdminQuery({
    lessonId: lessonIdQuery
  })

  const maxSizeGB = 2
  const maxSize = maxSizeGB * 1024 * 1024 * 1024

  const [
    { files, isDragging, errors: errorsVideo },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }
  ] = useFileUpload({
    accept: 'video/mp4,video/mov,video/avi,video/wmv,video/flv,video/mkv,video/webm',
    maxSize
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(
      UpdateLessonBodySchema.pick({
        title: true,
        description: true,
        videoUrl: true,
        isDraft: true
      })
    )
  })

  useEffect(() => {
    reset({
      title: lessonDetail?.data.data.title,
      description: lessonDetail?.data.data.description,
      videoUrl: lessonDetail?.data.data.videoUrl,
      isDraft: lessonDetail?.data.data.isDraft
    })
  }, [lessonDetail, reset])

  const onSubmit = (body: Omit<UpdateLessonBodyType, 'chapterId' | 'courseId' | 'duration'>) => {
    console.log(file)
    console.log(body)
  }

  if (isPending || !lessonDetail) return null

  const lesson = lessonDetail.data.data

  return (
    <Lesson
      control={control}
      errors={errors}
      lesson={lesson}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
      watch={watch}
      setValue={setValue}
      setFile={setFile}
      uploadFile={{
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        openFileDialog,
        errors: errorsVideo,
        files,
        getInputProps,
        isDragging,
        removeFile,
      }}
    />
  )
}
