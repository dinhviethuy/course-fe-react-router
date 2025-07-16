import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type Table as TableType } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { cn, formatCurrency } from "~/lib/utils"


interface CartItem {
  id: number
  status: string
  snapshots: [
    {
      id: number,
      courseImage: string,
      courseTitle: string,
      coursePrice: number,
      courseDiscount: number,
      couponDiscount: number | null,
      couponType: string | null,
    }
  ]
}

const data: CartItem[] = [
  {
    id: 1,
    status: 'paid',
    snapshots: [
      {
        id: 1,
        courseImage: 'https://github.com/shadcn.png',
        courseTitle: 'Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 1',
        coursePrice: 1690000,
        courseDiscount: 10,
        couponDiscount: 100000,
        couponType: 'percent'
      }
    ]
  },
  {
    id: 2,
    status: 'pending',
    snapshots: [
      {
        id: 2,
        courseImage: 'https://github.com/shadcn.png',
        courseTitle: 'Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 2',
        coursePrice: 1690000,
        courseDiscount: 10,
        couponDiscount: 100000,
        couponType: 'percent'
      }
    ]
  },
  {
    id: 3,
    status: 'canceled',
    snapshots: [
      {
        id: 3,
        courseImage: 'https://github.com/shadcn.png',
        courseTitle: 'Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 3',
        coursePrice: 1690000,
        courseDiscount: 10,
        couponDiscount: 100000,
        couponType: 'percent'
      }
    ]
  }
]

interface DataTablePaginationProps<TData> {
  table: TableType<TData>
}
function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center px-2 w-full">
      <div className="flex items-center space-x-6 lg:space-x-8 w-full justify-end">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}


function getColumns({ handleCancel }: { handleCancel: (id: number) => void }): ColumnDef<CartItem>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-primary">{row.original.id}</span>
        </div>
      }
    },
    {
      header: "Mã thanh toán",
      cell: ({ row }) => {
        return <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-primary">DH{row.original.id}</span>
        </div>
      }
    },
    {
      accessorKey: "title",
      header: "Khóa học",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img src={row.original.snapshots[0].courseImage} alt={row.original.snapshots[0].courseTitle} className="w-10 h-10 rounded-md" />
          <span>{row.original.snapshots[0].courseTitle}</span>
        </div>
      )
    },
    {
      accessorKey: "price",
      header: 'Giá',
      cell: ({ row }) => {
        const { coursePrice, courseDiscount, couponDiscount, couponType } = row.original.snapshots[0]
        let total = coursePrice * (1 - courseDiscount / 100)
        if (couponType && couponDiscount) {
          if (couponType === 'percent') {
            total = total - total * couponDiscount / 100
          } else {
            total = total - couponDiscount
          }
        }
        if (total < 0) {
          total = 0
        }
        return <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-primary">
            {formatCurrency(total)}
          </span>
        </div>
      }
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const { status } = row.original
        return <div className="flex flex-col gap-2">
          <Badge variant="outline" className={cn('h-6', {
            'bg-green-500 text-white': status.toLowerCase() === 'paid',
            'bg-red-500 text-white': status.toLowerCase() === 'canceled',
            'bg-yellow-500 text-white': status.toLowerCase() === 'pending'
          })}>{status.toUpperCase()}</Badge>
        </div>
      }
    },
    {
      header: "Hành động",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Link to={`/manage/orders/detail/${row.original.id}`}>
            <Button
              variant="default"
              className="cursor-pointer h-10 w-auto"
            >
              Chi tiết
            </Button>
          </Link>
          {row.original.status.toLowerCase() === 'pending' && (
            <Button
              variant="secondary"
              className="cursor-pointer h-10 w-auto"
              onClick={() => handleCancel(row.original.id)}
            >
              Hủy
            </Button>
          )}
        </div>
      )
    }
  ];
}


function BuildTable({ columns }: { columns: ColumnDef<CartItem>[] }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: 100,
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    pageCount: 100,
  })
  useEffect(() => {
    console.log(pagination)
  }, [pagination])
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-muted-foreground">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Không có đơn hàng nào
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="bg-background">
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
  const handleCancel = (id: number) => {
    console.log(id)
  }
  const columns = getColumns({ handleCancel })
  return (
    <div >
      <div>
        <h3 className="text-lg font-medium">Đơn hàng</h3>
      </div>
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6" />
      <div>
        <BuildTable columns={columns} />
      </div>
    </div>
  )
}