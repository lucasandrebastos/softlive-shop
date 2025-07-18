import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "./productsService";
import type { ProductFormData } from "../../types/product";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const create = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const update = useMutation({
    mutationFn: (data: { id: string; product: ProductFormData }) =>
      updateProduct(data.id, data.product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    productsQuery,
    create,
    update,
    remove,
  };
};
