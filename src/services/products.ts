import type { Product } from "../types/product";

const BASE_URL = "https://687177d276a5723aacd20c88.mockapi.io/api/v1/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const createProduct = async (product: Product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
};

export const updateProduct = async (id: string, product: Product) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
