import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Controller, type Control, type FieldErrors, type UseFormHandleSubmit, type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Switch } from '~/components/ui/switch'
import UploadVideo from '~/components/uploads/upload-video'
import { type FileMetadata } from '~/hooks/use-file-upload'
import { ClientOnly } from '~/layout/admin/ClientOnly'
import MarkdownEditor from '~/layout/admin/MarkdownEditor'
import { type CreateLessonBodyType, type UpdateLessonBodyType } from '~/types/lesson.type'

type LessonType = CreateLessonBodyType | UpdateLessonBodyType
interface IProps {
  lesson?: LessonType,
  onSubmit: (data: Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>) => void,
  handleSubmit: UseFormHandleSubmit<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  register: UseFormRegister<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  errors: FieldErrors<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  control: Control<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  setValue: UseFormSetValue<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  setFile: (file: File | FileMetadata | null) => void,
  lessonIdPrev?: number,
  lessonIdNext?: number,
  buttonText: string,
  isPending: boolean
}

export default function Lesson({ lesson, onSubmit, handleSubmit, control, register, errors, setValue, setFile, lessonIdPrev, lessonIdNext, buttonText, isPending }: IProps) {

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-5xl'
    >
      <div className=' space-y-10'>
        <Card className='shadow-lg'>
          <CardHeader className='flex justify-between flex-wrap-reverse gap-4'>
            <CardTitle className='text-xl'>📋 Thông tin bài học</CardTitle>
            <div className='flex gap-2'>
              {lessonIdPrev && (
                <Link to={`?lessonId=${lessonIdPrev}`} preventScrollReset>
                  <Button variant='outline' className='flex items-center gap-1 cursor-pointer w-[120px] h-[40px]'>
                    <ChevronLeft className='w-8 h-8' />
                    Bài trước
                  </Button>
                </Link>
              )}
              {lessonIdNext && (
                <Link to={`?lessonId=${lessonIdNext}`} preventScrollReset>
                  <Button variant='outline' className='flex items-center gap-1 cursor-pointer w-[120px] h-[40px]'>
                    Bài tiếp
                    <ChevronRight className='w-8 h-8' />
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label className='font-semibold'>Tên bài học</Label>
              <Input {...register('title')} />
              {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
            </div>
            <div className='space-y-2'>
              <Label className='font-semibold'>Trạng thái bản nháp</Label>
              <div className='flex items-center justify-between rounded-md border px-4 py-3 bg-muted'>
                <span className='text-sm text-muted-foreground'>Lưu bài học dưới dạng bản nháp</span>
                <Controller
                  name='isDraft'
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              {errors.isDraft && <p className='text-sm text-red-500'>{errors.isDraft.message}</p>}
            </div>
          </CardContent>
        </Card>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl'>🎬 Video bài học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='rounded-xl overflow-hidden border relative'>
              <UploadVideo
                register={register}
                videoUrl={lesson?.videoUrl}
                setValue={setValue}
                setFile={setFile}
              />
              {errors.videoUrl && <p className='text-red-500'>{errors.videoUrl.message}</p>}
            </div>
          </CardContent>
        </Card>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl'>📝 Mô tả bài học</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className='rounded-md'>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <ClientOnly>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </ClientOnly>
                )}
              />
              {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
            </ScrollArea>
          </CardContent>

        </Card>
        <CardFooter className='flex justify-center'>
          <Button type='submit' className='cursor-pointer' disabled={isPending}>
            {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
            {buttonText}
          </Button>
        </CardFooter>
      </div>
    </form>
  )
}
