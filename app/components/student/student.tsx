import { Check, Loader2, X } from "lucide-react";
import { useState } from 'react';
import { Controller, type Control, type FieldErrors, type UseFormHandleSubmit, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { Badge } from '~/components/ui/badge';
import { Button } from "~/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { CourseEnrollmentStatus, type CourseEnrollmentStatusType } from "~/constants/course-enrollment.constant";
import { cn } from "~/lib/utils";
import type { ListCoursesResType } from "~/types/course.type";
import type { CreateCourseEnrollmentBodyType } from "~/types/student.type";
import type { GetUsersResType } from "~/types/user.type";

interface IPropsChildren {
  options: GetUsersResType['users']
  selected: number[]
  onChange: (value: number[]) => void,
  disabled?: boolean
}

function MultiSelect({ options, selected, onChange, disabled }: IPropsChildren) {
  const [open, setOpen] = useState(false)

  const toggleValue = (value: number) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([value, ...selected])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onClick={() => !disabled && setOpen(true)}
          className={cn(
            "w-full min-h-[44px] border rounded-md px-3 py-2 text-sm flex flex-wrap gap-2 items-center cursor-text",
            "bg-background border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto w-full scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
              {selected.map((id) => {
                const item = options.find((opt) => opt.id === id)
                if (!item) return null
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="flex items-center gap-2 px-2 py-1 pr-1 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <div className="flex flex-col text-left overflow-hidden text-ellipsis">
                      <span className="text-sm font-medium leading-tight truncate">{item.fullName}</span>
                      <span className="text-xs text-muted-foreground truncate">{item.email}</span>
                    </div>
                    <button
                      type="button"
                      className="ml-1 rounded-full hover:bg-muted p-0.5 cursor-pointer shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(selected.filter((i) => i !== id));
                      }}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          ) : (
            <span className="text-muted-foreground">Chọn người dùng...</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="sm:w-lg">
          <CommandInput placeholder="Tìm kiếm..." />
          <CommandList className='scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => toggleValue(option.id)}
                className="cursor-pointer flex justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selected.includes(option.id) && "bg-primary text-accent-foreground"
                    )}
                  >
                    {selected.includes(option.id) && <Check className="h-3 w-3" />}
                  </div>
                  <div className="flex flex-col text-left">
                    <span>{option.fullName}</span>
                    <span className="text-xs text-gray-500">{option.email}</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface IProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  setValue: UseFormSetValue<CreateCourseEnrollmentBodyType>,
  handleSubmit: UseFormHandleSubmit<CreateCourseEnrollmentBodyType>,
  onSubmit: (data: CreateCourseEnrollmentBodyType) => void,
  // register: UseFormRegister<CreateCourseEnrollmentBodyType>,
  control: Control<CreateCourseEnrollmentBodyType>,
  watch: UseFormWatch<CreateCourseEnrollmentBodyType>,
  errors: FieldErrors<CreateCourseEnrollmentBodyType>,
  isPending: boolean,
  titleBox: string,
  children: React.ReactElement,
  reset: () => void,
  disabled?: boolean
  tooltipText: string,
  listCourse: ListCoursesResType['courses'],
  listUser: GetUsersResType['users'],
}

export default function Student({
  isOpen,
  setIsOpen,
  setValue,
  handleSubmit,
  onSubmit,
  // register,
  control,
  errors,
  watch,
  isPending,
  titleBox,
  children,
  reset,
  disabled,
  tooltipText,
  listCourse,
  listUser,
}: IProps) {

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) reset()
      setIsOpen(open)
    }}
      modal={false}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              {children}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className='dark px-2 py-1 text-xs'>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className={cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", {
        "hidden": !isOpen
      })} />
      <DialogContent className={cn("flex flex-col gap-0 overflow-y-visible p-0 [&>button:last-child]:top-3.5 sm:max-w-xl md:max-w-3xl", disabled && "pointer-events-none")}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b px-6 py-4 text-base">
              {titleBox}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-8 p-6 overflow-y-auto max-h-[calc(100vh-200px)] overflow-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="method">Trạng thái</Label>
                <Select
                  onValueChange={(value) => setValue('status', value as CourseEnrollmentStatusType)}
                  value={watch('status')}
                  disabled={disabled}
                  required
                >
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CourseEnrollmentStatus).map((status) => (
                      <SelectItem key={status} value={status} className="cursor-pointer">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="module">Chọn khóa học</Label>
                <Select
                  onValueChange={(value) => {
                    setValue('courseId', Number(value))
                  }}
                  value={watch('courseId')?.toString() ?? ''}
                  disabled={disabled}
                  required
                >
                  <SelectTrigger className="w-full">
                    <span className="truncate">
                      {listCourse.find(c => c.id === watch('courseId'))?.title ?? 'Chọn khóa học'}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {listCourse.map((course) => (
                      <SelectItem
                        key={course.id}
                        value={course.id.toString()}
                        className="py-2 px-3 cursor-pointer"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-sm font-medium truncate max-w-[300px]" title={course.title}>
                              {course.title}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 text-xs text-muted-foreground shrink-0 whitespace-nowrap justify-start">
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Tạo bởi:</span> {course.createdBy?.fullName}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Email:</span> {course.createdBy?.email}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.courseId && (
                  <p className="text-sm text-red-500">{errors.courseId.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="module">Người dùng</Label>
              <Controller
                control={control}
                name='userIds'
                render={({ field }) => (
                  <MultiSelect
                    selected={field.value || []}
                    onChange={field.onChange}
                    options={listUser}
                    disabled={disabled}
                  />
                )}
              />
              {errors.userIds && (
                <p className="text-sm text-red-500">{errors.userIds.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className={cn("border-t px-6 py-4", {
            "hidden": disabled
          })}>
            <DialogClose asChild className="cursor-pointer">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending && <Loader2 className="animate-spin" />}
              Lưu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}
