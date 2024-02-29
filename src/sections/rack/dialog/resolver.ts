import { z, object, string } from 'zod';

export const newRackSchema = object({
  rack_id: string().min(1, 'Rack ID is required').max(5, 'Rack ID must less than 5 characters'),
  location: string().max(200, 'Product Name must less than 200 characters'),
  max_stored: z.coerce.number().min(1, 'Minimum stored 1'),
});
