import { Helmet } from 'react-helmet-async';

import ManageUserView from 'src/sections/manage-user/view/manage-user-view';

// ----------------------------------------------------------------------

export default function ManageUserPage() {
  return (
    <>
      <Helmet>
        <title> Manage Users | PT Bintang Toedjoe </title>
      </Helmet>

      <ManageUserView />
    </>
  );
}
