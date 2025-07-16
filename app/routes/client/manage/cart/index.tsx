import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState, type Table as TableType } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { cn, formatCurrency } from "~/lib/utils"


interface CartItem {
  id: number
  title: string
  slug: string
  price: number
  image: string
  discount: number
}

const data: CartItem[] = [
  {
    id: 1,
    title: 'Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 1',
    slug: 'nest-js-super-du-an-ecommerce-api-tich-hop-thanh-toan-online-1',
    price: 1690000,
    image: 'https://github.com/shadcn.png',
    discount: 10
  },
  {
    id: 2,
    title: 'Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 2',
    slug: 'nest-js-super-du-an-ecommerce-api-tich-hop-thanh-toan-online-2',
    price: 1500000,
    image: 'https://github.com/shadcn.png',
    discount: 0
  },
  {
    id: 3,
    title: 'Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 3',
    slug: 'nest-js-super-du-an-ecommerce-api-tich-hop-thanh-toan-online-3',
    price: 1500000,
    image: 'https://github.com/shadcn.png',
    discount: 10
  },
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

function ShowDialogPay({ item }: { item: CartItem }) {
  const total = item.price * (1 - item.discount / 100)
  const [totalPay, setTotalPay] = useState(total)
  const [voucher, setVoucher] = useState('')
  const handleAddVoucher = () => {
    if (voucher === '123456') {
      setTotalPay(totalPay - 100000)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="cursor-pointer w-auto h-10">
          Thanh toán
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[792px]!">
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận đơn hàng</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-6 gap-4">
                <div className="flex gap-2 items-center col-span-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-md" />
                  <span className="text-base font-semibold text-primary">{item.title}</span>
                </div>
                <div className="flex flex-col gap-2 col-span-1">
                  <span className="text-base font-semibold text-primary">
                    {formatCurrency(total)}
                  </span>
                  {item.discount > 0 && (
                    <span className={cn("text-sm text-muted-foreground line-through")}>
                      {formatCurrency(item.price)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <div className="flex gap-2 items-center">
                    <Input type="text" className="w-full h-10" placeholder="Voucher" value={voucher} onChange={(e) => setVoucher(e.target.value)} />
                    <Button className="cursor-pointer h-10 w-auto" onClick={handleAddVoucher}>
                      Thêm
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-muted-foreground col-span-1 max-w-[150px] truncate">
                      HOCVIENSUPER
                    </span>
                    <span className="text-sm text-primary col-span-1 max-w-full truncate">
                      -{formatCurrency(1000000000)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex gap-2 items-center col-span-3">
                  <span className="text-base font-semibold text-primary">Tổng tiền thanh toán</span>
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <span className="text-base font-semibold text-primary">
                    {formatCurrency(totalPay)}
                  </span>
                  {totalPay < total && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCurrency(total)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer h-10 w-auto">Thoát</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer h-10 w-auto">Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function getColumns({ handleDelete }: { handleDelete: (id: number) => void }): ColumnDef<CartItem>[] {
  return [
    {
      accessorKey: "title",
      header: "Khóa học",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img src={row.original.image} alt={row.original.title} className="w-10 h-10 rounded-md" />
          <span>{row.original.title}</span>
        </div>
      )
    },
    {
      accessorFn: (row) => row.price,
      id: "finalPrice",
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted === "desc")}
            className="cursor-pointer"
          >
            Giá
            {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
            {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-primary">
            {formatCurrency(row.original.price * (1 - row.original.discount / 100))}
          </span>
          {row.original.discount > 0 && (
            <span className={cn("text-sm text-muted-foreground line-through")}>
              {formatCurrency(row.original.price)}
            </span>
          )}
        </div>
      )
    },
    {
      header: "Hành động",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <ShowDialogPay item={row.original} />
          <Button
            variant="ghost"
            className="cursor-pointer p-0 h-10 w-10"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash className="w-6 h-6" />
          </Button>
        </div>
      )
    }
  ];
}


function BuildTable({ columns }: { columns: ColumnDef<CartItem>[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
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
      sorting,
    },
    onPaginationChange: setPagination,
    pageCount: 100,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel()
  })
  useEffect(() => {
    console.log(sorting)
    console.log(pagination)
  }, [sorting, pagination])
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
              Không có khóa học nào trong giỏ hàng
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

export default function Cart() {
  const handleDelete = (id: number) => {
    console.log(id)
  }
  const columns = getColumns({ handleDelete })
  return (
    <div >
      <div>
        <h3 className="text-lg font-medium">Giỏ hàng</h3>
      </div>
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6" />
      <div>
        <BuildTable columns={columns} />
      </div>
    </div>
  )
}