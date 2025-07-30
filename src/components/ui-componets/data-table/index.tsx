'use client'
import * as S from './styles'

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTableProps } from './types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DataTablePagination } from './data-table-pagination'
import { Input } from '@/components/ui/input'
import { EllipsisVertical } from 'lucide-react'

export const DataTable = <TData, TValue>({
  columns,
  data,
  inputFilter,
  inputFilterLabel,
  onFocus = () => {},
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    columns,
    data,
    initialState: { pagination: { pageSize: 30 } },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), // como a tanstack é modular, nem toda logica por debaixo dos panos é inclusa no metodo de criação, então devemos inicializalo
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      rowSelection,
    },
  })
  return (
    <S.container>
      <div className="flex gap-3">
        <Input
          placeholder={`Filtrar por ${inputFilterLabel}`}
          className="max-w-sm"
          value={(table.getColumn(`${inputFilter}`)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(`${inputFilter}`)?.setFilterValue(event.target.value)}
          onFocus={onFocus}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex flex-wrap md:table-row ">
              {headerGroup.headers?.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder // indica se o cabecalho é um placeholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="flex flex-col md:table-row "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <S.cellNoRecordsFound $as={TableCell} colSpan={columns.length}>
                Nenhum registro encontrado
              </S.cellNoRecordsFound>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </S.container>
  )
}
