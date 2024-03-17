import { z, object, string } from 'zod';

export const newProductSchema = object({
  product_code: string()
    .min(1, 'Product ID is required')
    .max(5, 'Product ID must less than 5 characters'),
  product_name: string()
    .min(1, 'Product Name is required')
    .max(200, 'Product Name must less than 200 characters'),
  shelf_life: z.coerce.number().min(1),
  product_type: string().min(1, 'Product Type is required'),
  package: string().min(1, 'Product Type is required'),
});
