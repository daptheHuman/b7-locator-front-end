import axios from '../../../config/axios';
import { SampleId, DestroyReport } from '../types';

const destroyRetainedSample = (sampleIds: SampleId[]) =>
  axios
    .post<DestroyReport>('/referenced/generate-destroy-report', { samples: sampleIds })
    .then((response) => response.data.pdf_file_path)
    .catch((error: Error) => {
      throw error;
    });
export { destroyRetainedSample };
