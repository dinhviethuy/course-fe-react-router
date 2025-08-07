import type { Route } from '.react-router/types/app/routes/client/manage/orders/+types'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type Table as TableType,
  type Updater
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import LazyLoadImage from '~/components/ui-custom/lazy-image'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { CouponType } from '~/constants/counpon.constant'
import { OrderStatus, type OrderStatusType } from '~/constants/order.constant'
import { PAGE_LIMIT } from '~/constants/other.constant'
import { useCancalOrderMutation, useGetOrder } from '~/hooks/useOrder'
import { paymentSocket } from '~/lib/socket'
import { cn, formatCurrency, getOrderStatus, handleError } from '~/lib/utils'
import type { GetOrderListResType } from '~/types/order.type'

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Đơn hàng' }, { name: 'description', content: 'Đơn hàng' }]
}

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
  handleCancel
}: {
  handleCancel: (id: number) => void
}): ColumnDef<GetOrderListResType['orders'][number]>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => {
        return (
          <div className='flex flex-col gap-2'>
            <span className='text-base font-semibold text-primary'>{row.original.id}</span>
          </div>
        )
      }
    },
    {
      header: 'Mã thanh toán',
      cell: ({ row }) => {
        return (
          <div className='flex flex-col gap-2'>
            <span className='text-base font-semibold text-primary'>DH{row.original.id}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'title',
      header: 'Khóa học',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <LazyLoadImage
            src={row.original.snapshots[0]?.course?.image || row.original.snapshots[0]?.courseImage || ''}
            alt={row.original.snapshots[0]?.course?.title || row.original.snapshots[0]?.courseTitle || ''}
            className='w-10 h-10 rounded-md'
          />
          <span className='wrap-break-word'>{row.original.snapshots[0]?.course?.title || row.original.snapshots[0]?.courseTitle}</span>
        </div>
      )
    },
    {
      accessorKey: 'price',
      header: 'Giá',
      cell: ({ row }) => {
        const { snapshots } = row.original
        const { coursePrice, courseDiscount, couponDiscount, couponType } = snapshots[0] || {}
        let total = coursePrice ? coursePrice * (1 - (courseDiscount || 0) / 100) : 0
        if (couponType && couponDiscount) {
          if (couponType === CouponType.PERCENT) {
            total = total - (total * couponDiscount) / 100
          } else {
            total = total - couponDiscount
          }
        }
        if (total < 0) {
          total = 0
        }
        return (
          <div className='flex flex-col gap-2'>
            <span className='text-base font-semibold text-primary'>{formatCurrency(total)}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const { status } = row.original
        return (
          <div className='flex flex-col gap-2'>
            <Badge
              variant='outline'
              className={cn('h-6', {
                'bg-green-500 text-white': status.toUpperCase() === OrderStatus.PAID,
                'bg-red-500 text-white': status.toUpperCase() === OrderStatus.CANCELLED,
                'bg-yellow-500 text-white': status.toUpperCase() === OrderStatus.PENDING
              })}
            >
              {getOrderStatus(status)}
            </Badge>
          </div>
        )
      }
    },
    {
      header: 'Hành động',
      cell: ({ row }) => (
        <div className='flex gap-4 items-center'>
          <Link to={`/manage/orders/detail/${row.original.id}`}>
            <Button variant='default' className='cursor-pointer h-10 w-auto'>
              Chi tiết
            </Button>
          </Link>
          {row.original.status.toLowerCase() === 'pending' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='outline' className='cursor-pointer h-10 w-auto'>
                  Hủy
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn đang thực hiện hủy đơn hàng {row.original.snapshots[0]?.courseTitle}. Bạn có thể thêm đơn hàng
                    này vào giỏ hàng sau.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='cursor-pointer h-10 w-auto'>Thoát</AlertDialogCancel>
                  <AlertDialogAction
                    className='cursor-pointer h-10 w-auto'
                    onClick={() => handleCancel(row.original.id)}
                  >
                    Tiếp tục
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      )
    }
  ]
}

function BuildTable({
  columns,
  data,
  total,
  pagination,
  setPagination
}: {
  columns: ColumnDef<GetOrderListResType['orders'][number]>[]
  data: GetOrderListResType['orders'][number][]
  total: number
  pagination: {
    pageIndex: number
    pageSize: number
  }
  setPagination: (updaterOrValue: Updater<PaginationState> | PaginationState) => void
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
    pageCount: total
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
              Không có đơn hàng nào
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

export default function Orders() {
  const [status, setStatus] = useState<OrderStatusType | 'ALL'>('ALL')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_LIMIT
  })
  const getOders = useGetOrder({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: status === 'ALL' ? undefined : status
  })
  const cancelOrderMutation = useCancalOrderMutation()
  const data = getOders?.data?.data
  const handleCancel = async (orderId: number) => {
    try {
      await cancelOrderMutation.mutateAsync({ orderId })
      getOders.refetch()
      toast.success('Hủy đơn hàng thành công')
    } catch (error) {
      handleError({
        error
      })
    }
  }
  const handlePayment = useCallback(() => {
    getOders.refetch()
    toast.success('Đơn hàng đã được thanh toán thành công')
  }, [getOders])
  useEffect(() => {
    paymentSocket.on('payment', handlePayment)
    return () => {
      paymentSocket.off('payment', handlePayment)
    }
  }, [handlePayment])
  const columns = getColumns({ handleCancel })
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Đơn hàng</h3>
      </div>
      <div data-orientation='horizontal' role='none' className='shrink-0 bg-border h-[1px] w-full my-6' />
      <div className='flex justify-end items-center gap-2 py-4'>
        <span className='font-semibold'>Trạng thái</span>
        <Select value={status} onValueChange={(value) => setStatus(value as OrderStatusType | 'ALL')}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'ALL'}>Tất cả</SelectItem>
            <SelectItem value={OrderStatus.PAID}>Đã thanh toán</SelectItem>
            <SelectItem value={OrderStatus.PENDING}>Chưa thanh toán</SelectItem>
            <SelectItem value={OrderStatus.CANCELLED}>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <BuildTable
          columns={columns}
          data={data?.data.orders || []}
          total={data?.data.totalPages || 0}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  )
}
