import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Chapter from '~/components/chapter/chapter'
import { Button } from '~/components/ui/button'
import { useCreateChapterMutation } from '~/hooks/useChapter'
import { handleError } from '~/lib/utils'
import { CreateChapterBodySchema, type CreateChapterBodyType } from '~/types/chapter.type'

interface IProps {
  courseId: number
  // setChapters: React.Dispatch<React.SetStateAction<GetCourseDetailResTypeForAdmin['chapters']>>
}
export default function CreateChapter({ courseId }: IProps) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    defaultValues: {
      title: undefined,
      description: undefined,
      isDraft: true
    },
    resolver: zodResolver(CreateChapterBodySchema.omit({ courseId: true }))
  })
  const queryClient = useQueryClient()
  const createChapterMutation = useCreateChapterMutation()
  const handleSubmitForm = async (body: Omit<CreateChapterBodyType, 'courseId'>) => {
    try {
      await createChapterMutation.mutateAsync({
        ...body,
        courseId
      })
      reset()
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      // setChapters((prev) => [
      //   ...prev,
      //   {
      //     ...chapter.data,
      //     duration: 0,
      //     lessons: []
      //   }
      // ])
      setOpen(false)
      toast.success('Tạo chương mới thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  return (
    <Chapter
      titleBox='Thêm chương mới'
      register={register}
      errors={errors}
      open={open}
      setOpen={setOpen}
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
      control={control}
      buttonTextSubmit='Tạo chương ngay'
      isPending={createChapterMutation.isPending}
    >
      <Button>Thêm chương mới</Button>
    </Chapter>
  )
}
