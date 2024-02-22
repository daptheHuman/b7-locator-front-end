import { Moment } from 'moment';

export interface CreateRetainedSample {
  rack_id: string;
  product_code: string;
  batch_number: string;
  manufacturing_date: string;
  expiration_date: string;
  destroy_date: string;
}

export interface UpdateAndDeleteRetainedSample {
  id: number;
  rack_id: string;
  product_code: string;
  batch_number: string;
  manufacturing_date: Moment;
  expiration_date: Moment;
  destroy_date: Moment;
}

export interface DestroyReport {
  pdf_file_path: string;
}

export type SampleId = number;
