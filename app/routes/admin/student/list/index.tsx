import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type PaginationState,
  type Table as TableType,
  type Updater,
  useReactTable
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import AdminGuard from '~/components/guard/admin-guard'
import Loading from '~/components/loading/loading'
import CreateStudent from '~/components/student/create-student'
import StudentDetail from '~/components/student/student-detail'
import UpdateStudent from '~/components/student/update-student'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { CourseEnrollmentStatus, type CourseEnrollmentStatusType } from '~/constants/course-enrollment.constant'
import { OrderBy, type OrderByType, PAGE_LIMIT, SortBy, type SortByType } from '~/constants/other.constant'
import { ADMIN_PERMISSIONS } from '~/constants/permission.constant'
import { useDeleteStudentMutation, useListStudentQuery } from '~/hooks/useStudent'
import { cn, formatDate, handleError } from '~/lib/utils'
import type { GetCourseEnrollmentListResType } from '~/types/student.type'
interface DataTablePaginationProps<TData> {
  table: TableType<TData>
}

export function meta() {
  return [
    {
      title: 'Danh sách học viên',
      description: 'Danh sách học viên'
    }
  ]
}

function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center px-2 w-full'>
      <div className='flex items-center space-x-6 lg:space-x-8 w-full justify-end'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 30, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

function getColumns({
  handleDelete,
}: {
  handleDelete: (courseId: number) => void,
}): ColumnDef<GetCourseEnrollmentListResType['courseEnrollments'][number]>[] {
  return [
    {
      accessorKey: 'fullName',
      header: 'Tên người dùng',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='wrap-break-word'>{row.original.user.fullName}</span>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='wrap-break-word'>{row.original.user.email}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'titleCourse',
      header: 'Tên khóa học',
      cell: ({ row }) => (
        <div className='flex flex-col gap-2'>
          <div className='flex items-center flex-wrap gap-2'>
            <img src={row.original.course.image} alt={row.original.course.title} className='w-10 h-10 rounded-md' />
            <span className='wrap-break-word'>{row.original.course.title}</span>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <Badge variant="outline" className="gap-1.5">
            <span
              className={cn("size-1.5 rounded-full", row.original.status === CourseEnrollmentStatus.ACTIVE ? 'bg-emerald-500' : 'bg-red-500')}
              aria-hidden="true"
            ></span>
            {row.original.status === CourseEnrollmentStatus.ACTIVE ? 'Hoạt động' : 'Bị chặn'}
          </Badge>
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày tạo',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='wrap-break-word'>{formatDate(row.original.createdAt, 'dd/MM/yyyy HH:mm:ss')}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'updatedAt',
      header: 'Ngày cập nhật',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='wrap-break-word'>{formatDate(row.original.updatedAt, 'dd/MM/yyyy HH:mm:ss')}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'createdBy',
      header: 'Người tạo',
      cell: ({ row }) => {
        const { fullName, email } = row.original.course.createdBy || {}
        return (
          <div className='flex flex-col gap-0.5 text-sm leading-tight'>
            <span className='font-medium text-foreground truncate max-w-[160px]' title={fullName}>
              {fullName}
            </span>
            <span className='text-muted-foreground text-xs truncate max-w-[160px]' title={email}>
              {email}
            </span>
          </div>
        )
      }
    },
    {
      header: 'Hành động',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
          <AdminGuard path={ADMIN_PERMISSIONS.STUDENTS.GET_STUDENTS_COURSEENROLLMENTID.path} method={ADMIN_PERMISSIONS.STUDENTS.GET_STUDENTS_COURSEENROLLMENTID.method}>
            <StudentDetail data={row.original} />
          </AdminGuard>
          <AdminGuard path={ADMIN_PERMISSIONS.STUDENTS.PUT_STUDENTS_COURSEENROLLMENTID.path} method={ADMIN_PERMISSIONS.STUDENTS.PUT_STUDENTS_COURSEENROLLMENTID.method}>
            <UpdateStudent data={row.original} />
          </AdminGuard>
          <AdminGuard path={ADMIN_PERMISSIONS.STUDENTS.DELETE_STUDENTS_COURSEENROLLMENTID.path} method={ADMIN_PERMISSIONS.STUDENTS.DELETE_STUDENTS_COURSEENROLLMENTID.method}>
            <AlertDialog>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button variant='ghost' className='cursor-pointer p-0 h-10 w-10'>
                        <Trash className='w-6 h-6' />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent className='dark px-2 py-1 text-xs'>Xóa học viên</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn đang thực hiện xóa học viên <span className='font-semibold text-accent-foreground'>{row.original.user.fullName} </span>
                    khỏi khóa học <span className='font-semibold text-accent-foreground'>{row.original.course.title}</span>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='cursor-pointer h-10 w-auto'>Thoát</AlertDialogCancel>
                  <AlertDialogAction className='cursor-pointer h-10 w-auto' onClick={() => handleDelete(row.original.id)}>
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </AdminGuard>
        </div>
      )
    }
  ]
}

function BuildTable({
  columns,
  data,
  pagination,
  setPagination,
  total,
  isPending
}: {
  columns: ColumnDef<GetCourseEnrollmentListResType['courseEnrollments'][number]>[]
  data: GetCourseEnrollmentListResType['courseEnrollments'][number][]
  pagination: {
    pageIndex: number
    pageSize: number
  }
  setPagination: (updaterOrValue: Updater<PaginationState> | PaginationState) => void
  total: number,
  isPending: boolean
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: total,
    manualPagination: true,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    pageCount: total,
    getSortedRowModel: getSortedRowModel()
  })
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className='text-muted-foreground'>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          isPending ?
            (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  <Loading />
                </TableCell>
              </TableRow>
            )
            :
            (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Hiện chưa có học viên nào
                </TableCell>
              </TableRow>
            )
        )
        }
      </TableBody>
      <TableFooter className='bg-background'>
        <TableRow>
          <TableCell colSpan={columns.length}>
            <DataTablePagination table={table} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

function Students() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<CourseEnrollmentStatusType | 'all'>('all')
  const [titleCourse, setTitleCourse] = useState('')
  const [sort, setSort] = useState<{
    orderBy: OrderByType
    sortBy: Extract<SortByType, "createdAt" | "price" | "email" | "fullName" | "sale">
  }>({
    orderBy: OrderBy.Desc,
    sortBy: SortBy.CreatedAt
  })
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_LIMIT
  })
  const { data, refetch, isPending } = useListStudentQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    fullName: fullName.trim(),
    orderBy: sort.orderBy,
    sortBy: sort.sortBy,
    status: status === 'all' ? undefined : status,
    titleCourse: titleCourse.trim(),
    email: email.trim()
  })
  const deleteStudentMutation = useDeleteStudentMutation()
  const handleDelete = async (courseEnrollmentId: number) => {
    try {
      await deleteStudentMutation.mutateAsync({
        courseEnrollmentId
      })
      refetch()
      toast.success('Xóa học viên thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  const columns = getColumns({ handleDelete })

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className='text-2xl font-semibold'>Danh sách học viên</h1>
        <AdminGuard path={ADMIN_PERMISSIONS.STUDENTS.POST_STUDENTS.path} method={ADMIN_PERMISSIONS.STUDENTS.POST_STUDENTS.method}>
          <CreateStudent />
        </AdminGuard>
      </div>
      <div className='mb-4 flex items-center flex-wrap gap-4'>
        <Input
          placeholder='Tìm kiếm theo tên...'
          className='sm:w-[300px]'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          placeholder='Tìm kiếm theo email...'
          className='sm:w-[300px]'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Tìm kiếm theo tên khóa học...'
          className='sm:w-[300px]'
          value={titleCourse}
          onChange={(e) => setTitleCourse(e.target.value)}
        />
        <Select value={status} onValueChange={(value) => setStatus(value as (CourseEnrollmentStatusType | 'all'))}>
          <SelectTrigger className='w-[120px] sm:w-[200px]'>
            <SelectValue placeholder='Lọc theo trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value={CourseEnrollmentStatus.ACTIVE} className='flex items-center gap-2'>
              <span
                className={cn("size-1.5 rounded-full bg-emerald-500")}
                aria-hidden="true"
              ></span>
              Hoạt động
            </SelectItem>
            <SelectItem value={CourseEnrollmentStatus.BLOCKED} className='flex items-center gap-2'>
              <span
                className={cn("size-1.5 rounded-full bg-red-500")}
                aria-hidden="true"
              ></span>
              Bị chặn
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={`${sort.sortBy}-${sort.orderBy}`}
          onValueChange={(value) => {
            const [sortBy, orderBy] = value.split('-') as [Extract<SortByType, "createdAt" | "email" | "fullName">, OrderByType]
            setSort({ sortBy, orderBy })
          }}
        >
          <SelectTrigger className='w-[120px] sm:w-[200px]'>
            <SelectValue placeholder='Sắp xếp theo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={`${SortBy.CreatedAt}-${OrderBy.Desc}`}>Mới nhất</SelectItem>
            <SelectItem value={`${SortBy.CreatedAt}-${OrderBy.Asc}`}>Cũ nhất</SelectItem>
            <SelectItem value={`${SortBy.FullName}-${OrderBy.Asc}`}>Tên A-Z</SelectItem>
            <SelectItem value={`${SortBy.FullName}-${OrderBy.Desc}`}>Tên Z-A</SelectItem>
            <SelectItem value={`${SortBy.Email}-${OrderBy.Asc}`}>Email A-Z</SelectItem>
            <SelectItem value={`${SortBy.Email}-${OrderBy.Desc}`}>Email Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <BuildTable
          columns={columns}
          data={data?.data.data.courseEnrollments || []}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data.data.totalPages || 0}
          isPending={isPending}
        />
      </div>
    </>
  )
}

export default function StudentsPage() {
  return (
    <AdminGuard path={ADMIN_PERMISSIONS.STUDENTS.GET_STUDENTS.path} method={ADMIN_PERMISSIONS.STUDENTS.GET_STUDENTS.method} isPage>
      <Students />
    </AdminGuard>
  )
}