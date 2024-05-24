import { GetRelatorio } from '@/types/relatorios/get'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const Produtos = ({ data = [] }: { data: GetRelatorio['produtos'] }) => {
  const categorys = data.reduce((acc, item) => {
    if (!acc.includes(item.category_name)) {
      acc.push(item.category_name)
    }
    return acc
  }, [])

  return categorys.map((category) => {
    const dataProdutos = data.filter((item) => item.category_name === category)

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
            {dataProdutos.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-white">
              <TableHead className="font-bold text-black">Total</TableHead>
              <TableHead className="font-bold text-black">
                {dataProdutos.reduce((acc, item) => acc + item.quantity, 0)}
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  })
}
