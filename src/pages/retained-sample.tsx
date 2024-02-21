import { Helmet } from 'react-helmet-async';

import { RetainedSampleView } from 'src/sections/retained-sample/view';

// ----------------------------------------------------------------------

export default function RetainedSamplePage() {
  return (
    <>
      <Helmet>
        <title> Retained Sample | QC </title>
      </Helmet>

      <RetainedSampleView />
    </>
  );
}
