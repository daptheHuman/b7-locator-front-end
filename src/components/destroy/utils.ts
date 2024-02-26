import { DestroyPackageAndWeight } from './types';

export function convertToDestroyPackageAndWeight(samples: Sample[]): DestroyPackageAndWeight[] {
  // Initialize an object to store unique product codes
  const uniqueProductCodes: { [key: string]: boolean } = {};

  // Convert the samples to DestroyPackageAndWeight objects with unique product codes
  const result: DestroyPackageAndWeight[] = samples.reduce(
    (acc: DestroyPackageAndWeight[], sample: Sample) => {
      // If the product code is not already added to the uniqueProductCodes object, add it to the result array
      if (!uniqueProductCodes[sample.product_code]) {
        uniqueProductCodes[sample.product_code] = true; // Mark product code as added
        acc.push({
          product_code: sample.product_code,
          package: '', // Initialize package to empty string
          weight: 0, // Initialize weight to 0
        });
      }
      return acc;
    },
    []
  );

  return result;
}
