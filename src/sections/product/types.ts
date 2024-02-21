import { Moment } from 'moment';

import { GridRowId } from '@mui/x-data-grid';

export interface CreateRetainedSample {
  rack_id: string;
  product_code: string;
  batch_number: string;
  manufacturing_date: Moment;
  expiration_date: Moment;
  destroy_date: Moment;
}

export interface UpdateAndDeleteProduct {
  rack_id: string;
  product_code: string;
  batch_number: string;
  manufacturing_date: Moment;
  expiration_date: Moment;
  destroy_date: Moment;
}

export interface ProductRow extends Product {
  id: GridRowId;
}

export type SampleId = number;
