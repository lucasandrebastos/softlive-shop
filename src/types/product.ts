import { z } from "zod";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
}

// types/product.ts

export const productFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
  category: z.string().min(1, "Categoria obrigatória"),
});

export type ProductFormSchema = typeof productFormSchema;
export type ProductFormData = z.infer<typeof productFormSchema>;
