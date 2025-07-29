import { Loader2 } from 'lucide-react'
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister
} from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'
import type { CreateChapterBodyType, UpdateChatperBodyType } from '~/types/chapter.type'

type ChapterBodyType = UpdateChatperBodyType | CreateChapterBodyType

interface IProps {
  children: React.ReactElement
  buttonTextSubmit: string
  titleBox: string
  register: UseFormRegister<Omit<ChapterBodyType, 'courseId'>>
  errors: FieldErrors<ChapterBodyType>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isPending: boolean
  handleSubmit: UseFormHandleSubmit<Omit<ChapterBodyType, 'courseId'>>
  handleSubmitForm: (body: Omit<ChapterBodyType, 'courseId'>) => void
  control: Control<Omit<ChapterBodyType, 'courseId'>>
}
export default function Chapter({
  titleBox,
  register,
  errors,
  open,
  setOpen,
  handleSubmit,
  handleSubmitForm,
  buttonTextSubmit,
  isPending,
  control,
  children
}: IProps) {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className='flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5 md:max-w-3xl'>
          <DialogHeader className='contents space-y-0 text-left'>
            <DialogTitle className='border-b px-6 py-4 text-base'>{titleBox}</DialogTitle>
          </DialogHeader>
          <form className='space-y-5' onSubmit={handleSubmit(handleSubmitForm)}>
            <div className='px-6 py-4'>
              <div className='space-y-4'>
                <div className='*:not-first:mt-2'>
                  <Label>Tiêu đề chương</Label>
                  <Input {...register('title')} required />
                  {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <div className='*:not-first:mt-2'>
                  <Label>Mô tả chương</Label>
                  <Textarea
                    rows={10}
                    placeholder='Mô tả chương'
                    {...register('description')}
                    className='min-h-42 max-h-42 overflow-auto resize-none scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'
                  />
                  {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>
                <div className='space-x-2 col-span-1 flex'>
                  <Label>Trạng thái bản nháp</Label>
                  <Controller
                    name='isDraft'
                    control={control}
                    render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                  />
                  {errors.isDraft && <p className='text-red-500'>{errors.isDraft.message}</p>}
                </div>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <DialogClose asChild>
                  <Button variant='outline' className='h-10 cursor-pointer'>
                    Hủy
                  </Button>
                </DialogClose>
                <Button type='submit' disabled={isPending} className='cursor-pointer'>
                  {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
                  {buttonTextSubmit}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
