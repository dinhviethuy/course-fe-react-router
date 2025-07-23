import { type ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, type PaginationState, type Table as TableType, type Updater, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { CourseType } from "~/constants/course.constant";
import { OrderBy, type OrderByType, PAGE_LIMIT, SortBy, type SortByType } from "~/constants/other.constant";
import { useDeleteCourseMutation, useListCourseAdminQuery } from "~/hooks/useCourse";
import { cn, formatCurrency, handleError } from "~/lib/utils";
import type { ListCoursesResType } from "~/types/course.type";
interface DataTablePaginationProps<TData> {
  table: TableType<TData>
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
  handleDelete
}: {
  handleDelete: (courseId: number) => void
}): ColumnDef<ListCoursesResType['courses'][number]>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Khóa học',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <img src={row.original.image} alt={row.original.title} className='w-10 h-10 rounded-md' />
          <span className='wrap-break-word'>{row.original.title}</span>
        </div>
      )
    },
    {
      accessorKey: 'courseType',
      header: 'Loại',
      cell: ({ row }) => {
        const { courseType } = row.original
        return <div className='flex items-center gap-2 flex-wrap'>
          <Badge variant={courseType === CourseType.COMBO ? "default" : "secondary"}>{courseType}</Badge>
        </div>
      }
    },
    {
      accessorKey: 'price',
      header: 'Giá',
      cell: ({ row }) => (
        <div className='flex flex-col gap-2'>
          <span className={cn('text-base font-semibold text-primary')}>
            {row.original.price === 0 ? 'Miễn phí' : formatCurrency(row.original.price!)}
          </span>
        </div>
      )
    },
    {
      accessorKey: 'discount',
      header: 'Khuyyến mãi',
      cell: ({ row }) => (
        <div className='flex flex-col gap-2'>
          <span className={cn('text-base font-semibold text-primary')}>
            {row.original.discount}%
          </span>
        </div>
      )
    },
    {
      header: 'Hành động',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`/admin/courses/detail/${row.original.id}`}>
                  <Button variant='ghost' className='cursor-pointer p-0 h-10 w-10'>
                    <Eye className='w-6 h-6' />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="dark px-2 py-1 text-xs">
                Xem chi tiết và sửa khóa học
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' className='cursor-pointer p-0 h-10 w-10'>
                <Trash className='w-6 h-6' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn đang thực hiện xóa khóa học {row.original.title}.
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
  total
}: {
  columns: ColumnDef<ListCoursesResType['courses'][number]>[]
  data: ListCoursesResType['courses'][number][]
  pagination: {
    pageIndex: number
    pageSize: number
  }
  setPagination: (updaterOrValue: Updater<PaginationState> | PaginationState) => void
  total: number
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
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              Hiện không có khóa học nào
            </TableCell>
          </TableRow>
        )}
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

export default function Courses() {
  const [search, setSearch] = useState('')
  const [isDraft, setIsDraft] = useState<string>('all')
  const [sort, setSort] = useState<{
    orderBy: OrderByType,
    sortBy: Omit<SortByType, 'fullName' | 'email' | 'name'>
  }>({
    orderBy: OrderBy.Desc,
    sortBy: SortBy.CreatedAt
  })
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_LIMIT,
  })
  const { data, refetch } = useListCourseAdminQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search,
    isDraft,
    orderBy: sort.orderBy,
    sortBy: sort.sortBy as 'price' | 'createdAt' | 'sale'
  })
  const deleteCourseMutation = useDeleteCourseMutation()
  const handleDelete = async (courseId: number) => {
    try {
      await deleteCourseMutation.mutateAsync({
        courseId
      })
      refetch()
      toast.success('Xóa khóa học thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  const columns = getColumns({ handleDelete })

  return (
    <>
      <div className="flex items-center flex-wrap gap-4 justify-between mb-6">
        <h1 className="text-2xl font-semibold">Danh sách khóa học</h1>
        <Button asChild>
          <Link to="/admin/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tạo khóa học mới
          </Link>
        </Button>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <Input placeholder="Tìm kiếm theo tên..." className="w-[300px]" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select value={isDraft} onValueChange={(value) => setIsDraft(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="false">Đã xuất bản</SelectItem>
            <SelectItem value="true">Bản nháp</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={`${sort.sortBy}-${sort.orderBy}`}
          onValueChange={(value) => {
            const [sortBy, orderBy] = value.split('-') as [SortByType, OrderByType]
            setSort({ sortBy, orderBy })
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={`${SortBy.CreatedAt}-${OrderBy.Desc}`}>Mới nhất</SelectItem>
            <SelectItem value={`${SortBy.CreatedAt}-${OrderBy.Asc}`}>Cũ nhất</SelectItem>
            <SelectItem value={`${SortBy.Price}-${OrderBy.Asc}`}>Giá tăng dần</SelectItem>
            <SelectItem value={`${SortBy.Price}-${OrderBy.Desc}`}>Giá giảm dần</SelectItem>
            <SelectItem value={`${SortBy.Sale}-${OrderBy.Asc}`}>Giảm giá ít</SelectItem>
            <SelectItem value={`${SortBy.Sale}-${OrderBy.Desc}`}>Giảm giá nhiều</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <BuildTable
          columns={columns}
          data={data?.data.data.courses || []}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data.data.totalPages || 0}
        />
      </div>
    </>
  )
}