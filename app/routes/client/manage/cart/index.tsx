import type { Route } from '.react-router/types/app/routes/client/manage/cart/+types'
import { useQueryClient } from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type Table as TableType,
  type Updater
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trash } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
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
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteCartMutation, useGetListCart } from '~/hooks/useCart'
import { useValidateCouponMutation } from '~/hooks/useCounpon'
import { useCreateOrderMutation } from '~/hooks/useOrder'
import { cn, formatCurrency, handleError } from '~/lib/utils'
import type { GetListCartResType } from '~/types/cart.type'
import type { GetValidateCouponResType } from '~/types/coupon.type'
import type { CreateOrderBodyType } from '~/types/order.type'

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Giỏ hàng' }, { name: 'description', content: 'Giỏ hàng' }]
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

function ShowDialogPay({
  item,
  handleCreateOrder
}: {
  item: GetListCartResType['cartItems'][number]
  handleCreateOrder: (body: CreateOrderBodyType) => void
}) {
  const { course } = item
  const total = course.price * (1 - course.discount / 100)
  const [totalPay, setTotalPay] = useState(total)
  const [voucher, setVoucher] = useState('')
  const [resAfterValidate, setResAfterValidate] = useState<GetValidateCouponResType>()
  const validateCouponMutation = useValidateCouponMutation()
  const queryClient = useQueryClient()
  const handleAddVoucher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const resItem = await validateCouponMutation.mutateAsync({
        code: voucher,
        courseId: item.courseId
      })
      // nếu người dùng nhập cái mới thì cập nhật cái cũ
      const total = totalPay - resItem.data.data.discountAmount + (resAfterValidate?.discountAmount || 0)
      setResAfterValidate(resItem.data.data)
      setTotalPay(total)
    } catch (error) {
      handleError({
        error
      })
    } finally {
      setVoucher('')
    }
  }

  const handleCreate = () => {
    let body: CreateOrderBodyType = {
      cartId: item.id
    }
    if (resAfterValidate) {
      body = {
        ...body,
        couponId: resAfterValidate.id
      }
    }
    try {
      handleCreateOrder(body)
      queryClient.refetchQueries({ queryKey: ['cart'] })
    } catch (error) {
      handleError({ error })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='default' className='cursor-pointer w-auto h-10'>
          Thanh toán
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-full max-w-[90vw] md:max-w-[792px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận đơn hàng</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-6 gap-4'>
                <div className='flex gap-2 items-center md:col-span-3 col-span-6'>
                  <img src={course.image} alt={course.title} className='w-12 h-12 rounded-md object-cover' />
                  <span className='text-base font-semibold text-primary'>{course.title}</span>
                </div>
                <div className='flex flex-col gap-2 col-span-1 md:col-span-1'>
                  <span className='text-base font-semibold text-primary'>
                    {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price * (1 - course.discount / 100))}
                  </span>
                  {course.discount > 0 && course.price !== 0 && (
                    <span className={cn('text-sm text-muted-foreground line-through')}>
                      {formatCurrency(course.price)}
                    </span>
                  )}
                </div>
                <div className='flex flex-col gap-2 col-span-6 md:col-span-2'>
                  <form onSubmit={handleAddVoucher} className='flex gap-2 items-center'>
                    <Input
                      type='text'
                      className='w-full h-10'
                      placeholder='Voucher'
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                    <Button className='cursor-pointer h-10 w-auto' type='submit'>
                      Thêm
                    </Button>
                  </form>
                  {resAfterValidate && (
                    <div className='grid grid-cols-2 gap-2'>
                      <span className='text-sm text-muted-foreground col-span-1 max-w-[150px] truncate'>
                        {resAfterValidate.code}
                      </span>
                      <span className='text-sm text-primary col-span-1 max-w-full truncate'>
                        -{formatCurrency(resAfterValidate.discountAmount)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-6 gap-4'>
                <div className='flex gap-2 items-center col-span-3'>
                  <span className='text-base font-semibold text-primary'>Tổng tiền thanh toán</span>
                </div>
                <div className='flex flex-col gap-1 col-span-1'>
                  <span className='text-base font-semibold text-primary'>{formatCurrency(totalPay)}</span>
                  {totalPay < total && (
                    <span className='text-sm text-muted-foreground line-through'>{formatCurrency(total)}</span>
                  )}
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer h-10 w-auto'>Thoát</AlertDialogCancel>
          <AlertDialogAction className='cursor-pointer h-10 w-auto' onClick={handleCreate}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function getColumns({
  handleDelete,
  handleCreateOrder
}: {
  handleDelete: (id: number) => void
  handleCreateOrder: (body: CreateOrderBodyType) => void
}): ColumnDef<GetListCartResType['cartItems'][number]>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Khóa học',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <img src={row.original.course.image} alt={row.original.course.title} className='w-10 h-10 rounded-md' />
          <span className='wrap-break-word'>{row.original.course.title}</span>
        </div>
      )
    },
    {
      accessorKey: 'price',
      header: 'Giá',
      cell: ({ row }) => (
        <div className='flex flex-col gap-2'>
          <span className={cn('text-base font-semibold text-primary')}>
            {row.original.course.price === 0 ? 'Miễn phí' : formatCurrency(row.original.course.price * (1 - row.original.course.discount / 100))}
          </span>
          {row.original.course.discount > 0 && row.original.course.price !== 0 && (
            <span className={cn('text-sm text-muted-foreground line-through')}>
              {formatCurrency(row.original.course.price)}
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Hành động',
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
          <ShowDialogPay item={row.original} handleCreateOrder={handleCreateOrder} />
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
                  Bạn đang thực hiện xóa khóa học {row.original.course.title}. Bạn có thể thêm khóa học này vào giỏ hàng
                  sau.
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
  columns: ColumnDef<GetListCartResType['cartItems'][number]>[]
  data: GetListCartResType['cartItems'][number][]
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
              Không có khóa học nào trong giỏ hàng
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

export default function Cart() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const { data: cart } = useGetListCart({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  })
  const queryClient = useQueryClient()
  const createOrderMutation = useCreateOrderMutation()
  const deleteCartMutation = useDeleteCartMutation()
  const navigate = useNavigate()
  const handleCreateOrder = async (body: CreateOrderBodyType) => {
    try {
      const ressult = await createOrderMutation.mutateAsync(body)
      queryClient.refetchQueries({ queryKey: ['cart'] })
      // queryClient.refetchQueries({ queryKey: ['order'] })
      toast.success('Tạo đơn hàng thành công')
      navigate(`/manage/orders/detail/${ressult.data.data.id}`)
    } catch (error) {
      handleError({
        error
      })
    }
  }
  const data = cart?.data
  const handleDelete = async (cartId: number) => {
    try {
      await deleteCartMutation.mutateAsync({ cartId })
      queryClient.refetchQueries({ queryKey: ['cart'] })
      toast.success('Xóa giỏ hàng thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  const columns = getColumns({ handleDelete, handleCreateOrder })
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Giỏ hàng</h3>
      </div>
      <div data-orientation='horizontal' role='none' className='shrink-0 bg-border h-[1px] w-full my-6' />
      <div>
        <BuildTable
          columns={columns}
          data={data?.data.cartItems || []}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data.totalPages || 0}
        />
      </div>
    </div>
  )
}
