import { Helmet } from 'react-helmet-async';

import { AdminOnlyView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function AdminOnlyPage() {
  return (
    <>
      <Helmet>
        <title> Admin only </title>
      </Helmet>

      <AdminOnlyView />
    </>
  );
}
