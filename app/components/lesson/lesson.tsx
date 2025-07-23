import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Switch } from '~/components/ui/switch'
import UploadVideo from '~/components/uploads/upload-video'
import type { FileMetadata } from '~/hooks/use-file-upload'
import { ClientOnly } from '~/layout/admin/ClientOnly'
import MarkdownEditor from '~/layout/admin/MarkdownEditor'
import { CreateLessonBodySchema, type CreateLessonBodyType } from '~/types/lesson.type'

export default function Lesson() {
  const [file, setFile] = useState<File | FileMetadata | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
      isDraft: true
    },
    resolver: zodResolver(
      CreateLessonBodySchema.pick({
        title: true,
        description: true,
        videoUrl: true,
        isDraft: true
      })
    )
  })

  const onSubmit = (body: Omit<CreateLessonBodyType, 'chapterId' | 'courseId' | 'duration'>) => {
    console.log(file)
    console.log(body)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (e) => {
        console.log(e)
      })}
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
                videoUrl='http://localhost:3000/media/static/videos/849998b2-551e-4a48-a784-27c1d3af1614.mp4'
                setFile={setFile}
                setValue={setValue}
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
            Tạo bài học
          </Button>
        </CardFooter>
      </div>
    </form>
  )
}
