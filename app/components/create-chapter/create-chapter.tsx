import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { Textarea } from "~/components/ui/textarea"
import { CreateChapterBodySchema, type CreateChapterBodyType } from "~/types/chapter.type"

export default function CreateChapter() {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isDraft: true,
    },
    // Sửa lỗi: Đảm bảo đã import và sử dụng đúng schema, loại bỏ 'omit' không xác định
    resolver: zodResolver(CreateChapterBodySchema.omit({ courseId: true }))
  })
  const handleSubmitForm = (body: Omit<CreateChapterBodyType, 'courseId'>) => {
    console.log(body)
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Thêm chương</Button>
        </DialogTrigger>

        <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5 md:max-w-3xl">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b px-6 py-4 text-base">
              Thêm chương
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-5" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="*:not-first:mt-2">
                  <Label>Tiêu đề chương</Label>
                  <Input {...register('title')} />
                  {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div className="*:not-first:mt-2">
                  <Label>Mô tả chương</Label>
                  <Textarea
                    rows={10}
                    placeholder="Mô tả chương"
                    {...register('description')}
                    className="min-h-42 max-h-42 overflow-auto resize-none scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900"
                  />
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div className="space-x-2 col-span-1 flex">
                  <Label>Trạng thái bản nháp</Label>
                  <Controller
                    name="isDraft"
                    control={control}
                    render={({ field }) =>
                      <Switch checked={field.value} onCheckedChange={field.onChange}
                      />
                    }
                  />
                  {errors.isDraft && <p className="text-red-500">{errors.isDraft.message}</p>}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="h-10 cursor-pointer">Hủy</Button>
                </DialogClose>
                <Button type="submit">Thêm chương</Button>
              </div>
            </div>
          </form>
        </DialogContent>

      </Dialog>
    </div>
  )
}
