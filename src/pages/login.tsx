import { Helmet } from 'react-helmet-async';

import LoginView from 'src/sections/authentication/login-view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Quality Control | PT Bintang Toedjoe </title>
      </Helmet>

      <LoginView />
    </>
  );
}
