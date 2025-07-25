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
import CreateUser from '~/components/user/create-user'
import UpdateUser from '~/components/user/update-user'
import { OrderBy, type OrderByType, PAGE_LIMIT, SortBy, type SortByType } from '~/constants/other.constant'
import { RoleName } from '~/constants/role.constant'
import { UserStatus, type UserStatusType } from '~/constants/user.constant'
import { useListRoleQuery } from '~/hooks/useRole'
import { useDeleteUserMutation, useListUserQuery } from '~/hooks/useUser'
import { handleError } from '~/lib/utils'
import type { GetRolesResType } from '~/types/role.type'
import type { GetUsersResType } from '~/types/user.type'
interface DataTablePaginationProps<TData> {
  table: TableType<TData>
}

export function meta() {
  return [
    {
      title: 'Danh sách người dùng',
      description: 'Danh sách người dùng'
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
  roles
}: {
  handleDelete: (courseId: number) => void,
  roles: GetRolesResType['roles']
}): ColumnDef<GetUsersResType['users'][number]>[] {
  return [
    {
      accessorKey: 'fullName',
      header: 'Tên người dùng',
      cell: ({ row }) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='wrap-break-word'>{row.original.fullName}</span>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const { email } = row.original
        return (
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='wrap-break-word'>{email}</span>
          </div>
        )
      }
    },
    {
      accessorKey: 'role',
      header: 'Vai trò',
      cell: ({ row }) => (
        <div className='flex flex-col gap-2'>
          <Badge variant={row.original.role.name === RoleName.ADMIN ? 'default' : 'outline'}>
            {row.original.role.name}
          </Badge>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <div className='flex flex-col gap-2'>
          <Badge >{row.original.status}</Badge>
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
                <UpdateUser roles={roles || []} user={row.original} />
              </TooltipTrigger>
              <TooltipContent className='dark px-2 py-1 text-xs'>Cập nhật người dùng</TooltipContent>
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
                  Bạn đang thực hiện xóa người dùng <span className='font-semibold text-accent-foreground'>{row.original.fullName}</span>.
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
  columns: ColumnDef<GetUsersResType['users'][number]>[]
  data: GetUsersResType['users'][number][]
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
              Hiện chưa có người dùng nào
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

export default function Users() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<UserStatusType | 'all'>('all')
  const [roleId, setRoleId] = useState<number | string>('all')
  const [sort, setSort] = useState<{
    orderBy: OrderByType
    sortBy: Omit<SortByType, 'fullName' | 'email' | 'name'>
  }>({
    orderBy: OrderBy.Desc,
    sortBy: SortBy.CreatedAt
  })
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_LIMIT
  })
  const { data: listRole } = useListRoleQuery({
    getAll: true
  })
  const { data, refetch } = useListUserQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search,
    orderBy: sort.orderBy,
    sortBy: sort.sortBy as 'email' | 'fullName' | 'createdAt',
    status: status === 'all' ? undefined : status,
    roleId: roleId === 'all' ? undefined : Number(roleId)
  })
  const deleteUserMutation = useDeleteUserMutation()
  const handleDelete = async (userId: number) => {
    try {
      await deleteUserMutation.mutateAsync({
        userId
      })
      refetch()
      toast.success('Xóa người dùng thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  const columns = getColumns({ handleDelete, roles: listRole?.data.data.roles || [] })

  return (
    <>
      <div className='flex items-center flex-wrap gap-4 justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Danh sách người dùng</h1>
        <CreateUser roles={listRole?.data.data.roles || []} />
      </div>
      <div className='mb-4 flex items-center flex-wrap gap-4'>
        <Input
          placeholder='Tìm kiếm theo tên...'
          className='sm:w-[300px]'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={status} onValueChange={(value) => setStatus(value as (UserStatusType | 'all'))}>
          <SelectTrigger className='w-[120px] sm:w-[200px]'>
            <SelectValue placeholder='Lọc theo trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Trạng thái</SelectItem>
            <SelectItem value={UserStatus.ACTIVE}>Hoạt động</SelectItem>
            <SelectItem value={UserStatus.BLOCKED}>Bị chặn</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleId?.toString()} onValueChange={(value) => setRoleId(value)}>
          <SelectTrigger className='w-[120px] sm:w-[200px]'>
            <SelectValue placeholder='Lọc theo vai trò' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Vai trò</SelectItem>
            {listRole?.data.data.roles.map((role) => (
              <SelectItem key={role.id} value={role.id.toString()}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={`${sort.sortBy}-${sort.orderBy}`}
          onValueChange={(value) => {
            const [sortBy, orderBy] = value.split('-') as [SortByType, OrderByType]
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
          data={data?.data.data.users || []}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data.data.totalPages || 0}
        />
      </div>
    </>
  )
}
