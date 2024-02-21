import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const RacksPage = lazy(() => import('src/pages/racks'));
export const RetainedSamplePage = lazy(() => import('src/pages/retained-sample'));
export const ReferencedSamplePage = lazy(() => import('src/pages/referenced-sample'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'products', element: <ProductsPage /> },
        { path: 'retained-samples', element: <RetainedSamplePage /> },
        { path: 'referenced-samples', element: <ReferencedSamplePage /> },
        { path: 'racks', element: <RacksPage /> },
      ],
    },
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
