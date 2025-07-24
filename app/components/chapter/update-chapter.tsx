import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Chapter from '~/components/chapter/chapter'
import { UpdateChapterBodySchema, type UpdateChatperBodyType } from '~/types/chapter.type'
import type { GetCourseDetailResTypeForAdmin } from '~/types/course.type'

export default function UpdateChapter({
  chapter,
  handleUpdateChapter,
  isPending,
  children
}: {
  chapter: GetCourseDetailResTypeForAdmin['chapters'][number]
  handleUpdateChapter: (body: Omit<UpdateChatperBodyType, 'courseId'>, chapterId: number) => void
  isPending: boolean
  children: React.ReactElement
}) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    defaultValues: {
      title: chapter.title,
      description: chapter.description,
      isDraft: chapter.isDraft
    },
    resolver: zodResolver(UpdateChapterBodySchema.omit({ courseId: true }))
  })
  const handleSubmitForm = async (body: Omit<UpdateChatperBodyType, 'courseId'>) => {
    handleUpdateChapter(body, chapter.id)
    setOpen(false)
  }

  useEffect(() => {
    if (chapter) {
      reset({
        title: chapter.title,
        description: chapter.description,
        isDraft: chapter.isDraft
      })
    }
  }, [chapter, reset])

  return (
    <Chapter
      titleBox='Cập nhật chương'
      register={register}
      errors={errors}
      open={open}
      setOpen={setOpen}
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
      control={control}
      buttonTextSubmit='Cập nhật chương'
      isPending={isPending}
    >
      {children}
    </Chapter>
  )
}
