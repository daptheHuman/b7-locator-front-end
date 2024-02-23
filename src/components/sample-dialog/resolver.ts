import { object, string } from 'zod';

export const newSampleSchema = object({
  product_code: string().min(1, 'Please select product'),
  rack_id: string().min(1, 'Please select rack'),
  batch_number: string()
    .min(1, 'Please enter the batch number')
    .max(5, 'Batch number must less than 5 characters'),
  manufacturing_date: string().min(1, 'Please enter the date'),
});
