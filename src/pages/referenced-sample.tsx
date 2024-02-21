import { Helmet } from 'react-helmet-async';

import { ReferencedSampleView } from 'src/sections/reference-sample/view';

// ----------------------------------------------------------------------

export default function ReferencedSamplePage() {
  return (
    <>
      <Helmet>
        <title> Referenced Samples | QC </title>
      </Helmet>

      <ReferencedSampleView />
    </>
  );
}
