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
import CreateCoupon from '~/components/coupon/create-coupon'
import Loading from '~/components/loading/loading'
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
import { CouponType } from '~/constants/counpon.constant'
import { OrderBy, type OrderByType, PAGE_LIMIT, SortBy, type SortByType } from '~/constants/other.constant'
import { useDeleteCouponMutation, useGetCouponsQuery } from '~/hooks/useCoupon'
import { cn, formatCurrency, formatDate, handleError } from '~/lib/utils'
import type { GetCouponListResType } from '~/types/coupon.type'

interface DataTablePaginationProps<TData> {
  table: TableType<TData>
}

export function meta() {
  return [
    {
      title: 'Danh sách mã giảm giá',
      description: 'Danh sách mã giảm giá'
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
  handleDelete: (couponId: number) => void
}): ColumnDef<GetCouponListResType['coupons'][number]>[] {
  return [
    {
      accessorKey: 'code',
      header: 'Mã giảm giá',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='wrap-break-word'>{row.original.code}</span>
        </div>
      )
    },
    {
      accessorKey: 'couponType',
      header: 'Loại giảm giá',
      cell: ({ row }) => {
        const { couponType } = row.original
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <Badge variant={couponType === CouponType.FIXED ? 'default' : 'secondary'} className='wrap-break-word'>{couponType}</Badge>
          </div>
        )
      }
    },
    {
      accessorKey: 'isActive',
      header: 'Trạng thái',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <Badge variant="outline" className="gap-1.5">
              <span
                className={cn("size-1.5 rounded-full", row.original.isActive ? 'bg-emerald-500' : 'bg-red-500')}
                aria-hidden="true"
              ></span>
              {row.original.isActive ? 'Hoạt động' : 'Không hoạt động'}
            </Badge>
          </div>
        )
      }
    },
    {
      accessorKey: 'discount',
      header: 'Giảm giá',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <Badge className='wrap-break-word font-bold'>
            {row.original.couponType === CouponType.PERCENT ? `${row.original.discount}%` : formatCurrency(row.original.discount)}
          </Badge>
        </div>
      )
    },
    {
      accessorKey: 'startAt',
      header: 'Ngày bắt đầu',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='wrap-break-word'>{formatDate(row.original.startAt, 'dd/MM/yyyy HH:mm:ss')}</span>
        </div>
      )
    },
    {
      accessorKey: 'endAt',
      header: 'Ngày kết thúc',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='wrap-break-word'>{formatDate(row.original.endAt, 'dd/MM/yyyy HH:mm:ss')}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày tạo',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='wrap-break-word'>{formatDate(row.original.createdAt, 'dd/MM/yyyy HH:mm:ss')}</span>
        </div>
      )
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
      header: 'Hành động',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
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
                <TooltipContent className='dark px-2 py-1 text-xs'>Xóa mã giảm giá</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn đang thực hiện xóa mã giảm giá <span className='font-semibold text-accent-foreground'>{row.original.code}</span>.
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
  total,
  isPending
}: {
  columns: ColumnDef<GetCouponListResType['coupons'][number]>[]
  data: GetCouponListResType['coupons'][number][]
  pagination: {
    pageIndex: number
    pageSize: number
  }
  setPagination: (updaterOrValue: Updater<PaginationState> | PaginationState) => void
  total: number
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
                  Hiện không có mã giảm giá nào
                </TableCell>
              </TableRow>
            )
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

export default function Coupons() {
  const [search, setSearch] = useState('')
  const [couponType, setCouponType] = useState<CouponType | 'all'>('all')
  const [isActive, setIsActive] = useState<string | 'all'>('all')
  const [sort, setSort] = useState<{
    orderBy: OrderByType
    sortBy: Extract<SortByType, 'createdAt'>
  }>({
    orderBy: OrderBy.Desc,
    sortBy: SortBy.CreatedAt
  })
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_LIMIT
  })
  const { data, refetch, isPending } = useGetCouponsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: search.trim(),
    couponType: couponType === 'all' ? undefined : couponType,
    isActive: isActive === 'all' ? undefined : isActive,
    orderBy: sort.orderBy,
    sortBy: sort.sortBy,
  })
  const deleteCouponMutation = useDeleteCouponMutation()
  const handleDelete = async (couponId: number) => {
    try {
      await deleteCouponMutation.mutateAsync({
        couponId
      })
      refetch()
      toast.success('Xóa mã giảm giá thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  const coupons = data?.data.data.coupons || []
  const columns = getColumns({ handleDelete })

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold">Danh sách mã giảm giá</h1>
        <CreateCoupon />
      </div>

      <div className='mb-4 flex items-center flex-wrap gap-4'>
        <Input
          placeholder='Tìm kiếm theo mã...'
          className='sm:w-[300px]'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={couponType} onValueChange={(value) => setCouponType(value as CouponType | 'all')}>
          <SelectTrigger className='w-[120px] sm:w-[200px]'>
            <SelectValue placeholder='Lọc theo loại' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả loại</SelectItem>
            {Object.values(CouponType).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={`${sort.sortBy}-${sort.orderBy}`}
          onValueChange={(value) => {
            const [sortBy, orderBy] = value.split('-') as [Extract<SortByType, 'createdAt'>, OrderByType]
            setSort({ sortBy, orderBy })
          }}
        >
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Sắp xếp theo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={`${SortBy.CreatedAt}-${OrderBy.Desc}`}>Mới nhất</SelectItem>
            <SelectItem value={`${SortBy.CreatedAt}-${OrderBy.Asc}`}>Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={isActive}
          onValueChange={(value) => {
            setIsActive(value as string | 'all')
          }}
        >
          <SelectTrigger className='w-[120px] sm:w-[200px]'>
            <SelectValue placeholder='Lọc theo trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='true'>Hoạt động</SelectItem>
            <SelectItem value='false'>Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <BuildTable
          columns={columns}
          data={coupons}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data.data.totalPages || 0}
          isPending={isPending}
        />
      </div>
    </>
  )
}
