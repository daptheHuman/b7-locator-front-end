import { Helmet } from 'react-helmet-async';

import RegisterView from 'src/sections/authentication/register-view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Quality Control | PT Bintang Toedjoe </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
