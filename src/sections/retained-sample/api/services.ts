import axios from 'src/config/axios';

import { SampleId, DestroyReport } from '../types';

const destroyRetainedSample = (sampleIds: SampleId[]) =>
  axios
    .post<DestroyReport>('/retained/generate-destroy-report', { samples: sampleIds })
    .then((response) => response.data.pdf_file_path)
    .catch((error: Error) => {
      throw error;
    });
export { destroyRetainedSample };
