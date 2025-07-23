import { X } from "lucide-react"
import { useState } from "react"
import { Controller, type Control, type FieldErrors, type UseFormGetValues, type UseFormHandleSubmit, type UseFormRegister, type UseFormReset, type UseFormSetValue } from "react-hook-form"
import { MultiSelect } from "~/components/ui-custom/multi-select"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Switch } from "~/components/ui/switch"
import { Textarea } from "~/components/ui/textarea"
import UploadImage from "~/components/uploads/upload-image"
import { CourseType } from "~/constants/course.constant"
import type { FileMetadata } from "~/hooks/use-file-upload"
import { cn } from "~/lib/utils"
import type { CreateCourseBodyType, UpdateCourseBodyType } from "~/types/course.type"

const ids = [1, 2, 3, 4]

interface IProps {
  register: UseFormRegister<UpdateCourseBodyType | CreateCourseBodyType>,
  errors: FieldErrors<UpdateCourseBodyType | CreateCourseBodyType>,
  control: Control<UpdateCourseBodyType | CreateCourseBodyType>,
  reset: UseFormReset<UpdateCourseBodyType | CreateCourseBodyType>,
  handleSubmit: UseFormHandleSubmit<UpdateCourseBodyType | CreateCourseBodyType>,
  handleSubmitForm: (data: UpdateCourseBodyType | CreateCourseBodyType) => void,
  setValue: UseFormSetValue<UpdateCourseBodyType | CreateCourseBodyType>,
  setFile: (file: File | FileMetadata) => void,
  data: UpdateCourseBodyType | CreateCourseBodyType,
  isDirty: boolean,
  titleHeader: string,
  buttonText: string,
  getValues: UseFormGetValues<UpdateCourseBodyType | CreateCourseBodyType>,
  isUpdate?: boolean
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
  getValues,
  isUpdate
}: IProps) {
  const [newBenefit, setNewBenefit] = useState("")
  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl">{titleHeader}</CardTitle>
          <div className={cn("flex justify-end gap-4", {
            "hidden": !isDirty
          })}>
            <Button variant="outline" onClick={() => reset(data)}>Hủy</Button>
            <Button type="submit">{buttonText}</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4 col-span-2 lg:col-span-1">
              <div className="space-y-2">
                <Label>Tiêu đề</Label>
                <Input {...register('title')} placeholder="Tiêu đề khóa học" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input {...register('slug')} placeholder="nestjs-super" />
                {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Giá</Label>
                <Input
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="Nhập giá"
                  min={0}
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Giảm giá (%)</Label>
                <Input
                  type="number"
                  {...register('discount', { valueAsNumber: true })}
                  placeholder="0"
                  min={0}
                />
                {errors.discount && <p className="text-red-500">{errors.discount.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Video giới thiệu (YouTube)</Label>
                <Input {...register('video')} placeholder="https://youtube.com/..." />
                {errors.video && <p className="text-red-500">{errors.video.message}</p>}
              </div>
              <div className="grid grid-cols-2">
                <div className="space-y-2 col-span-1">
                  <Label>Trạng thái bản nháp</Label>
                  <Controller
                    name="isDraft"
                    control={control}
                    defaultValue={data.isDraft}
                    render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                  />
                  {errors.isDraft && <p className="text-red-500">{errors.isDraft.message}</p>}
                </div>
                <div className="space-y-2 col-span-1">
                  <Label>Loại khóa học</Label>
                  <Controller
                    name="courseType"
                    control={control}
                    defaultValue={data.courseType}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} disabled={isUpdate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SINGLE">SINGLE</SelectItem>
                          <SelectItem value="COMBO">COMBO</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.courseType && (
                    <p className="text-red-500">{errors.courseType.message}</p>
                  )}
                </div>
                {getValues('courseType') === CourseType.COMBO && <div className="space-y-2 col-span-1">
                  <Label>Khóa học con</Label>
                  <Controller
                    control={control}
                    name="courseIds"
                    render={({ field }) => (
                      <MultiSelect
                        selected={field.value || []}
                        onChange={field.onChange}
                        options={ids.map((id) => ({
                          id,
                          title: id.toString()
                        }))}
                      />
                    )}
                  />
                  {errors.courseIds && <p className="text-red-500">{errors.courseIds.message}</p>}
                </div>
                }
              </div>
            </div>
            <div className="space-y-4 col-span-2 lg:col-span-1">
              <div className="space-y-2">
                <Label>Mô tả</Label>
                <Textarea
                  {...register('description')}
                  rows={10}
                  placeholder="Mô tả khóa học chi tiết..."
                  className="min-h-48 max-h-48 overflow-auto resize-none scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Ảnh bìa khóa học</Label>
                <UploadImage register={register} image={data.image} setValue={setValue} setFile={setFile} />
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Controller
        control={control}
        name="benefits"
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle>Lợi ích học viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {field.value?.map((b: string, i: number) => (
                  <Badge
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 pr-1 pointer-events-none"
                  >
                    <span className="pointer-events-auto">{b}</span>
                    <button
                      type="button"
                      className="ml-1 p-0.5 hover:bg-background text-accent-foreground rounded-full cursor-pointer pointer-events-auto"
                      onClick={() =>
                        field.onChange(field.value?.filter((_, index) => index !== i))
                      }
                    >
                      <X size={12} className="text-muted-foreground" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
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
                  placeholder="Thêm lợi ích mới"
                />
                <Button
                  type="button"
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
              {errors.benefits && (
                <p className="text-sm text-red-500">{errors.benefits.message}</p>
              )}
            </CardContent>
          </Card>
        )}
      />
    </form>
  )
}