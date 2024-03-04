import { lazy, Suspense, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { UserContext } from 'src/authentication/user-context';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const RacksPage = lazy(() => import('src/pages/racks'));
export const RetainedSamplePage = lazy(() => import('src/pages/retained-sample'));
export const ReferencedSamplePage = lazy(() => import('src/pages/referenced-sample'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const AuditTrailPage = lazy(() => import('src/pages/audit-trail'));
export const AdminOnlyPage = lazy(() => import('src/pages/admin-only'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useContext(UserContext);
  const routes = useRoutes([
    {
      element: user ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'products', element: <ProductsPage /> },
        { path: 'retained-samples', element: <RetainedSamplePage /> },
        { path: 'referenced-samples', element: <ReferencedSamplePage /> },
        { path: 'racks', element: <RacksPage /> },
        { path: 'audit-trail', element: user?.is_admin ? <AuditTrailPage /> : <AdminOnlyPage /> },
      ],
    },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
