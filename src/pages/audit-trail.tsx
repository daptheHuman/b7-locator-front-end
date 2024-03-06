import { Helmet } from 'react-helmet-async';

import { AuditTrailView } from 'src/sections/audit-trail/view';

// ----------------------------------------------------------------------

export default function AuditTrailPage() {
  return (
    <>
      <Helmet>
        <title> Audit Trail | PT Bintang Toedjoe </title>
      </Helmet>

      <AuditTrailView />
    </>
  );
}
