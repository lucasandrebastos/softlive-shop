import { useEffect, useState } from "react";
import type { Product, ProductFormData } from "./types/product";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from "./services/products";
import ProductForm from "./components/ProductsForm";
import Modal from "./components/Modal";
import DeleteDialog from "./components/DeleteDialog";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "delete">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
    },
  });
  const updateMutation = useMutation({
    mutationFn: (data: { id: string; product: ProductFormData }) =>
      updateProduct(data.id, data.product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao buscar produtos.</p>;

  return (
    <>
      <div className="w-1/2 mx-auto mt-8">
        <div className="flex justify-between">
          <p className="text-[#111418] text-4xl font-bold min-w-72">Produtos</p>
          <button
            onClick={() => {
              setMode("create");
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="cursor-pointer items-center justify-center rounded-lg h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium"
          >
            <span>Adicionar produto</span>
          </button>
        </div>
        <table className="flex-1 rounded-lg border border-[#dbe0e6] bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
                Description
              </th>
              <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
                Category
              </th>
              <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium">
                Price
              </th>
              <th className="px-4 py-3 text-left w-60 text-[#60758a] text-sm font-medium">
                Actions
              </th>
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
                    onClick={() => {
                      setMode("edit");
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-500 hover:underline hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setMode("delete");
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="ml-2 text-red-500 hover:underline hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {mode === "delete" ? (
          <DeleteDialog
            productId={selectedProduct?.id ?? ""}
            onSubmit={handleDelete}
            onCancel={() => setIsModalOpen(false)}
          />
        ) : (
          <ProductForm
            initialValues={selectedProduct ?? undefined}
            onSubmit={(data) => {
              if (mode === "create") {
                createMutation.mutate(data);
              } else {
                updateMutation.mutate({
                  id: selectedProduct!.id,
                  product: data,
                });
              }
              setIsModalOpen(false);
            }}
          />
        )}
      </Modal>
    </>
  );
}

export default App;
