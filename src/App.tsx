import { useEffect, useState } from "react";
import type { Product } from "./types/product";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from "./services/products";
import ProductForm from "./ProductsForm";
import Modal from "./Modal";
import DeleteDialog from "./DeleteDialog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [products]);

  function editProduct(id: string, product: Product) {
    updateProduct(id, product);
  }

  return (
    <>
      <div className="w-1/2 mx-auto mt-8">
        <div className="flex justify-between">
          <p className="text-[#111418] text-4xl font-bold min-w-72">Products</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="cursor-pointer items-center justify-center rounded-lg h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium"
          >
            <span>Add Product</span>
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
          {products.map((product) => (
            <tbody>
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
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-blue-500 hover:underline hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
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

      {/* edit modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ProductForm onSubmit={() => console.log("editou")} />
      </Modal>

      {/* create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ProductForm onSubmit={() => console.log("criou")} />
      </Modal>

      {/* delete modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteDialog onSubmit={() => console.log("deletou")} />
      </Modal>
    </>
  );
}

export default App;
