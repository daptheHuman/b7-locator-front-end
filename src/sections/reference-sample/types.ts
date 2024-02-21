import { Moment } from 'moment';


export interface CreateReferencedSample {
  rack_id: string;
  product_code: string;
  batch_number: string;
  manufacturing_date: Moment;
  expiration_date: Moment;
  destroy_date: Moment;
}

export interface UpdateAndDeleteReferencedSample {
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
