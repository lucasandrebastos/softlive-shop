import { useState } from "react";
import type { Product } from "../../types/product";
import Modal from "../../components/Modal";
import DeleteDialog from "../../components/DeleteDialog";
import ProductForm from "../../components/ProductsForm";

import { useProducts } from "./useProducts";
import ProductTable from "../../components/ProductTable";
import type { Mode } from "../../types/mode";

export default function ProductsPage() {
  const { productsQuery, create, update, remove } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<Mode>("create");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    remove.mutate(id);
    setIsModalOpen(false);
  };

  const openModal = (mode: Mode, product?: Product) => {
    setMode(mode);
    setSelectedProduct(product ?? null);
    setIsModalOpen(true);
  };

  if (productsQuery.isLoading) return <p>Carregando produtos...</p>;
  if (productsQuery.isError) return <p>Erro ao carregar produtos.</p>;
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
        <ProductTable
          products={productsQuery.data ?? []}
          onEdit={(product) => openModal("edit", product)}
          onDelete={(product) => openModal("delete", product)}
        />
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
                create.mutate(data);
              } else {
                update.mutate({
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
