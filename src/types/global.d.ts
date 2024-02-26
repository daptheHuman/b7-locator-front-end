export {};

declare global {
  interface Sample {
    id: number;
    product_name: string;
    shelf_life: number;
    product_code: string;
    batch_number: string;
    manufacturing_date: Date;
    expiration_date: Date;
    destroy_date: Date;
    rack_id: string;
  }

  export interface DestroyPackageAndWeight {
    product_code: string;
    package: string;
    weight: number;
  }

  interface RetainedSample {
    id: number;
    product_name: string;
    shelf_life: number;
    product_code: string;
    batch_number: string;
    manufacturing_date: Date;
    expiration_date: Date;
    destroy_date: Date;
    rack_id: string;
  }

  interface ReferencedSample {
    id: number;
    product_name: string;
    shelf_life: number;
    product_code: string;
    batch_number: string;
    manufacturing_date: Date;
    expiration_date: Date;
    destroy_date: Date;
    rack_id: string;
  }

  interface Product {
    product_code: string;
    product_name: string;
    shelf_life: number;
  }

  interface Rack {
    rack_id: string;
    location: string;
  }

  interface HTTPExceptionError {
    status_code: number;
    detail: string;
  }
}
