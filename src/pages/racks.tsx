import { Helmet } from 'react-helmet-async';

import { RackView } from 'src/sections/rack/view';
// ----------------------------------------------------------------------

export default function RacksPage() {
  return (
    <>
      <Helmet>
        <title> Racks | QC </title>
      </Helmet>

      <RackView />
    </>
  );
}
