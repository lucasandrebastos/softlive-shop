import type { Product } from "../types/product";

interface IProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: IProductTableProps) {
  return (
    <table className="flex-1 rounded-lg border border-[#dbe0e6] bg-white">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
            Nome
          </th>
          <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
            Descrição
          </th>
          <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
            Categoria
          </th>
          <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
            Preço
          </th>
          <th className="px-4 py-3 text-left w-60 text-[#60758a] text-sm font-medium"></th>
        </tr>
      </thead>
      {products?.map((product) => (
        <tbody key={product.id}>
          <tr className="border-t border-t-[#dbe0e6]">
            <td className="px-4 py-2 w-[400px] text-[#111418] text-sm font-normal">
              {product.name}
            </td>
            <td className="px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal">
              {product.description}
            </td>
            <td className="px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal">
              {product.category}
            </td>
            <td className="px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal">
              {product.price.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </td>
            <td className="px-4 py-2 w-60 text-[#60758a] text-sm font-normal">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-500 hover:underline hover:cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product)}
                className="ml-2 text-red-500 hover:underline hover:cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
