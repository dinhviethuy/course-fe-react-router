import { Label } from '@radix-ui/react-dropdown-menu'
import { Controller, type Control, type FieldErrors, type UseFormHandleSubmit, type UseFormRegister, type UseFormSetValue, type UseFormWatch } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Switch } from '~/components/ui/switch'
import UploadVideo from '~/components/uploads/upload-video'
import type { FileMetadata, FileWithPreview } from '~/hooks/use-file-upload'
import { ClientOnly } from '~/layout/admin/ClientOnly'
import MarkdownEditor from '~/layout/admin/MarkdownEditor'
import { type CreateLessonBodyType, type UpdateLessonBodyType } from '~/types/lesson.type'

type LessonType = CreateLessonBodyType | UpdateLessonBodyType
interface IProps {
  lesson: LessonType,
  onSubmit: (data: Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>) => void,
  handleSubmit: UseFormHandleSubmit<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  register: UseFormRegister<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  errors: FieldErrors<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  control: Control<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  watch: UseFormWatch<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  setValue: UseFormSetValue<Omit<LessonType, 'chapterId' | 'courseId' | 'duration'>>,
  setFile: (file: File | FileMetadata | null) => void,
  uploadFile: {
    handleDragEnter: (e: React.DragEvent<HTMLElement>) => void
    handleDragLeave: (e: React.DragEvent<HTMLElement>) => void
    handleDragOver: (e: React.DragEvent<HTMLElement>) => void
    handleDrop: (e: React.DragEvent<HTMLElement>) => void
    openFileDialog: () => void
    removeFile: (id: string) => void
    getInputProps: (
      props?: React.InputHTMLAttributes<HTMLInputElement>
    ) => React.InputHTMLAttributes<HTMLInputElement> & { ref: React.Ref<HTMLInputElement> }
    files: FileWithPreview[]
    isDragging: boolean
    errors: string[]
  }
}

export default function Lesson({ lesson, onSubmit, handleSubmit, control, register, errors, watch, setValue, setFile, uploadFile }: IProps) {

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-5xl'
    >
      <div className=' space-y-10'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl'>📋 Thông tin bài học</CardTitle>
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
                setFile={setFile}
                setValue={setValue}
                uploadFile={uploadFile}
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
              <div>
                <ClientOnly>
                  <MarkdownEditor
                    value={watch('description')}
                    onChange={(val) =>
                      setValue('description', val, {
                        shouldDirty: true,
                        shouldValidate: true
                      })
                    }
                  />
                </ClientOnly>
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <CardFooter className='flex justify-center'>
          <Button type='submit' className='cursor-pointer'>
            Cập nhật bài học
          </Button>
        </CardFooter>
      </div>
    </form>
  )
}
