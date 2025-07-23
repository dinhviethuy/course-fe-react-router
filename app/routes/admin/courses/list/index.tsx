import { type ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, type PaginationState, type Table as TableType, type Updater, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { CourseType } from "~/constants/course.constant";
import { PAGE_LIMIT } from "~/constants/other.constant";
import { cn, formatCurrency } from "~/lib/utils";
import type { ListCoursesResType } from "~/types/course.type";

const courses: ListCoursesResType['courses'] = [
  {
    id: 33,
    title: "[Pre-order] Combo Nest.js Super & Testing & GraphQL 4",
    description: "Đây là gói combo tiết kiệm. Bạn chỉ cần mua khóa này là sỡ hữu được 3 khóa: Nest.js Super & Nest.js Testing & Nest.js GraphQL.",
    slug: "[Pre-order] Combo Nest.js Super & Testing & GraphQL 4",
    price: 790000,
    isDraft: false,
    courseType: "COMBO",
    discount: 38,
    image: "https://api.edu.duthanhduoc.com/static/documents/4c5f827fe7664045b6c0c2e03ba55123.png"
  },
  {
    id: 32,
    title: "[Pre-order] Combo Nest.js Super & Testing & GraphQL 3",
    description: "Đây là gói combo tiết kiệm. Bạn chỉ cần mua khóa này là sỡ hữu được 3 khóa: Nest.js Super & Nest.js Testing & Nest.js GraphQL.",
    slug: "[Pre-order] Combo Nest.js Super & Testing & GraphQL 3",
    price: 790000,
    isDraft: false,
    courseType: "COMBO",
    discount: 38,
    image: "https://api.edu.duthanhduoc.com/static/documents/4c5f827fe7664045b6c0c2e03ba55123.png"
  },
  {
    id: 31,
    title: "[Pre-order] Combo Nest.js Super & Testing & GraphQL 2",
    description: "Đây là gói combo tiết kiệm. Bạn chỉ cần mua khóa này là sỡ hữu được 3 khóa: Nest.js Super & Nest.js Testing & Nest.js GraphQL.",
    slug: "[Pre-order] Combo Nest.js Super & Testing & GraphQL 2",
    price: 790000,
    isDraft: false,
    courseType: "COMBO",
    discount: 38,
    image: "https://api.edu.duthanhduoc.com/static/documents/4c5f827fe7664045b6c0c2e03ba55123.png"
  },
  {
    id: 29,
    title: "[Pre-order] Combo Nest.js Super & Testing & GraphQL",
    description: "Đây là gói combo tiết kiệm. Bạn chỉ cần mua khóa này là sỡ hữu được 3 khóa: Nest.js Super & Nest.js Testing & Nest.js GraphQL.",
    slug: "[Pre-order] Combo Nest.js Super & Testing & GraphQL",
    price: 5000,
    isDraft: false,
    courseType: "COMBO",
    discount: 0,
    image: "https://api.edu.duthanhduoc.com/static/documents/4c5f827fe7664045b6c0c2e03ba55123.png"
  },
  {
    id: 28,
    title: "[Pre-order] Nest.js GraphQL",
    description: "Học cả 2 cách tiếp cận (code-first & schema-first) để tạo GraphQL APIs với NestJS. Master các concept GraphQL, tip & trick, và mọi thứ bạn cần biết để làm chủ GraphQL. Bạn sẽ được cung cấp mã nguồn dự án API Ecommerce (của khóa Nest.js Super) để thực hành",
    slug: "Nest.js-GraphQL",
    price: 10000,
    isDraft: false,
    courseType: "SINGLE",
    discount: 38,
    image: "https://api.edu.duthanhduoc.com/static/documents/0f57a59b2dcc410385e6b40d922e9bb1.png"
  },
  {
    id: 17,
    title: "[Pre-order] Nest.js Testing",
    description: "Học cách viết Unit Test và e2e Test với Nest.js. Mình sẽ chia sẻ hết tất tần tật những kinh nghiệm viết test với Nest.js mà mình biết. Bạn sẽ được cung cấp mã nguồn dự án API Ecommerce (của khóa Nest.js Super) để thực hành viết test",
    slug: "Nest.js-Testing",
    price: 0,
    isDraft: false,
    courseType: "SINGLE",
    discount: 38,
    image: "https://edu.duthanhduoc.com/_next/image?url=https%3A%2F%2Fapi.edu.duthanhduoc.com%2Fstatic%2Fdocuments%2F4c5f827fe7664045b6c0c2e03ba55123.png&w=750&q=75"
  },
  {
    id: 27,
    title: "Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online",
    description: "Mình sẽ hướng dẫn các bạn A-Z về framework Nest.js thông qua dự án API website thương mại điện tử. Ngoài những chức năng cơ bản ai cũng biết, thì các bạn sẽ được học về tích hợp cổng thanh toán, xác thực 2FA, Monorepo, Caching, Permission Based Access Control, Rate Limit, Swagger, xử lý nhiều request cùng đặt hàng,... Mình đã bỏ ra hơn 9 triệu để mua khóa Nest.js của creator Nest.js nên tin mình đi, đây là khóa ngon nhất mà bạn tìm thấy trên internet với mức giá hợp lý nhất.",
    slug: "Nest.js-Super",
    price: 1590000,
    isDraft: false,
    courseType: "SINGLE",
    discount: 0,
    image: "https://api.edu.duthanhduoc.com/static/documents/a6c5a0870eaa49f9982196d6814a6772.png"
  }
]

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

function getColumns(): ColumnDef<ListCoursesResType['courses'][number]>[] {
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
            {row.original.price === 0 ? 'Miễn phí' : formatCurrency(row.original.price * (1 - row.original.discount / 100))}
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
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' className='cursor-pointer p-0 h-10 w-10'>
                      <Trash className='w-6 h-6' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="dark px-2 py-1 text-xs">
                    Xóa khóa học
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                <AlertDialogAction className='cursor-pointer h-10 w-auto'>
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_LIMIT
  })
  const columns = getColumns()
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
        <Input placeholder="Tìm kiếm theo tên..." className="w-[300px]" />
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <BuildTable
          columns={columns}
          data={courses || []}
          pagination={pagination}
          setPagination={setPagination}
          total={1000}
        />
      </div>
    </>
  )
}