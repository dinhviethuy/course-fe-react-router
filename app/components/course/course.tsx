import { Loader2, X } from 'lucide-react'
import { useState } from 'react'
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormReset,
  type UseFormSetValue,
  type UseFormWatch
} from 'react-hook-form'
import { MultiSelect } from '~/components/ui-custom/multi-select'
import NumberCustom from '~/components/ui-custom/number-custom'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'
import UploadImage from '~/components/uploads/upload-image'
import { CourseType } from '~/constants/course.constant'
import { type FileMetadata, type FileWithPreview } from '~/hooks/use-file-upload'
import { useListCourseAdminQuery } from '~/hooks/useCourse'
import { cn } from '~/lib/utils'
import type { CreateCourseBodyType, UpdateCourseBodyType } from '~/types/course.type'

interface IProps {
  register: UseFormRegister<UpdateCourseBodyType | CreateCourseBodyType>
  errors: FieldErrors<UpdateCourseBodyType | CreateCourseBodyType>
  control: Control<UpdateCourseBodyType | CreateCourseBodyType>
  reset: UseFormReset<UpdateCourseBodyType | CreateCourseBodyType>
  handleSubmit: UseFormHandleSubmit<UpdateCourseBodyType | CreateCourseBodyType>
  handleSubmitForm: (data: UpdateCourseBodyType | CreateCourseBodyType) => void
  setValue: UseFormSetValue<UpdateCourseBodyType | CreateCourseBodyType>
  setFile: (file: File | FileMetadata) => void
  data: UpdateCourseBodyType | CreateCourseBodyType
  isDirty: boolean
  titleHeader: string
  buttonText?: string
  isUpdate?: boolean
  watch: UseFormWatch<UpdateCourseBodyType | CreateCourseBodyType>
  getValues: UseFormGetValues<UpdateCourseBodyType | CreateCourseBodyType>
  uploadFile?: {
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
    maxSizeMB: number
  }
  isPending: boolean,
  disabled?: boolean
}

export default function Course({
  register,
  errors,
  control,
  reset,
  handleSubmit,
  handleSubmitForm,
  setValue,
  setFile,
  data,
  isDirty,
  titleHeader,
  buttonText,
  isUpdate,
  uploadFile,
  watch,
  isPending,
  disabled
}: IProps) {
  const [newBenefit, setNewBenefit] = useState('')
  const { data: getListCourse } = useListCourseAdminQuery({
    getAll: true
  })
  const courses = getListCourse?.data.data
  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Card>
        <CardHeader className='flex justify-between items-center flex-wrap-reverse gap-4'>
          <CardTitle className='text-2xl'>{titleHeader}</CardTitle>
          <div
            className={cn('flex justify-end gap-4', {
              hidden: !isDirty || disabled
            })}
          >
            <Button variant='outline' className='cursor-pointer' onClick={() => reset({
              benefits: data.benefits,
              courseIds: data.courseType === CourseType.COMBO ? data.courseIds : undefined,
              courseType: data.courseType,
              description: data.description,
              discount: data.discount,
              image: data.image,
              isDraft: data.isDraft,
              price: data.price,
              slug: data.slug,
              title: data.title,
              video: data.video
            })} disabled={disabled}>
              Hủy
            </Button>
            <Button type='submit' disabled={isPending || disabled} className='cursor-pointer' >
              {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
              {buttonText}
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-4 col-span-2 lg:col-span-1'>
              <div className='space-y-2'>
                <Label>Tiêu đề</Label>
                <Input {...register('title')} placeholder='Tiêu đề khóa học' required disabled={disabled} />
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
              </div>
              <div className='space-y-2'>
                <Label>Slug</Label>
                <Input {...register('slug')} placeholder='nestjs-super' required disabled={disabled} />
                {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}
              </div>
              <div className='space-y-2'>
                <NumberCustom
                  minValue={0}
                  label='Giá'
                  control={control}
                  step={1000}
                  name='price'
                  disabled={disabled}
                  custom={{
                    name: 'price',
                    groupSeparator: ',',
                    allowDecimals: false,
                    allowNegativeValue: false,
                    intlConfig: {
                      locale: 'vi-VN',
                      currency: 'VND'
                    },
                    min: 0,
                    step: 1000,
                  }}
                />
                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
              </div>
              <div className='space-y-2'>
                <NumberCustom
                  minValue={0}
                  maxValue={100}
                  label='Giảm giá (%)'
                  control={control}
                  name='discount'
                  disabled={disabled}
                  custom={{
                    name: 'discount',
                    suffix: '%',
                    allowDecimals: false,
                    allowNegativeValue: false,
                    step: 1,
                    min: 0,
                    max: 100
                  }}
                />
                {errors.discount && <p className='text-red-500'>{errors.discount.message}</p>}
              </div>
              <div className='space-y-2'>
                <Label>Video giới thiệu (YouTube)</Label>
                <Input {...register('video')} placeholder='https://youtube.com/...' required disabled={disabled} />
                {errors.video && <p className='text-red-500'>{errors.video.message}</p>}
              </div>
              <div className='grid grid-cols-2'>
                <div className='space-y-2 col-span-1'>
                  <Label>Trạng thái bản nháp</Label>
                  <Controller
                    name='isDraft'
                    control={control}
                    defaultValue={data.isDraft}
                    render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />}
                  />
                  {errors.isDraft && <p className='text-red-500'>{errors.isDraft.message}</p>}
                </div>
                <div className='space-y-2 col-span-1'>
                  <Label>Loại khóa học</Label>
                  <Controller
                    name='courseType'
                    control={control}
                    defaultValue={data.courseType}
                    render={({ field }) => (
                      <Select value={field.value} required onValueChange={field.onChange} disabled={isUpdate || disabled}>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn loại' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={CourseType.SINGLE}>SINGLE</SelectItem>
                          <SelectItem value={CourseType.COMBO}>COMBO</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.courseType && <p className='text-red-500'>{errors.courseType.message}</p>}
                </div>
                {watch('courseType') === CourseType.COMBO && courses && (
                  <div className='space-y-2 col-span-2'>
                    <Label>Khóa học con</Label>
                    <Controller
                      control={control}
                      name='courseIds'
                      render={({ field }) => (
                        <MultiSelect
                          selected={field.value || []}
                          onChange={field.onChange}
                          options={courses?.courses
                            .filter((course) => course.slug !== data?.slug)
                            .map((course) => ({
                              id: course.id,
                              title: course.title
                            }))}
                          disabled={disabled}
                        />
                      )}
                    />
                    {errors.courseIds && <p className='text-red-500'>{errors.courseIds.message}</p>}
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-4 col-span-2 lg:col-span-1'>
              <div className='space-y-2'>
                <Label>Mô tả</Label>
                <Textarea
                  disabled={disabled}
                  {...register('description')}
                  rows={10}
                  placeholder='Mô tả khóa học chi tiết...'
                  className='min-h-48 max-h-48 overflow-auto resize-none scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'
                />
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
              </div>
              <div className='space-y-2'>
                <Label>Ảnh bìa khóa học</Label>
                <UploadImage
                  register={register}
                  image={data.image}
                  setValue={setValue}
                  setFile={setFile}
                  uploadFile={uploadFile}
                  disabled={disabled}
                />
                {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Controller
        control={control}
        name='benefits'
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle>Lợi ích học viên</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex gap-2 flex-wrap'>
                {field.value?.map((b: string, i: number) => (
                  <Badge
                    key={i}
                    className='max-w-full px-2 py-1 pr-1 pointer-events-none'
                  >
                    <div className='flex items-start gap-1 w-full'>
                      <span className='whitespace-normal break-words pointer-events-auto'>
                        {b}
                      </span>
                      <Button
                        type='button'
                        className={cn('flex-shrink-0 w-[16px] h-[16px] hover:bg-background text-accent-foreground rounded-full cursor-pointer pointer-events-auto', disabled && 'hidden')}
                        onClick={() => field.onChange(field.value?.filter((_, index) => index !== i))}
                      >
                        <X size={12} className='text-muted-foreground' />
                      </Button>
                    </div>
                  </Badge>
                ))}
              </div>
              {!disabled &&
                <div className='flex gap-2'>
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (newBenefit.trim() !== '') {
                          field.onChange([...(field.value || []), newBenefit.trim()])
                          setNewBenefit('')
                        }
                      }
                    }}
                    placeholder='Thêm lợi ích mới'
                  />
                  <Button
                    type='button'
                    className='cursor-pointer'
                    onClick={() => {
                      if (newBenefit.trim() !== '') {
                        field.onChange([...(field.value || []), newBenefit.trim()])
                        setNewBenefit('')
                      }
                    }}
                  >
                    Thêm
                  </Button>
                </div>
              }
              {errors.benefits && <p className='text-sm text-red-500'>{errors.benefits.message}</p>}
            </CardContent>
          </Card>
        )}
      />
    </form>
  )
}
