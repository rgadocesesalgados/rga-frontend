import { GetRelatorio } from '@/types/relatorios/get'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const Produtos = ({ data }: { data: GetRelatorio['produtos'] }) => {
  const categorys = Object.keys(data)

  return categorys.map((category) => {
    return (
      <div className="rounded-2xl border bg-white p-5" key={category}>
        <p className="ml-2 text-lg font-bold">{category}</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data[category].map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-white">
              <TableHead className="font-bold text-black">Total</TableHead>
              <TableHead className="font-bold text-black">
                {data[category].reduce((acc, item) => acc + item.count, 0)}
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  })
}
