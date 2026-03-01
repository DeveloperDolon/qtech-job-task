import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { lazy, Suspense } from "react";
import { PageLoader } from "../components/shared";

const AdminLoginPage = lazy(() => import("../pages/AdminLoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const JobsPage = lazy(() => import("../pages/JobPage"));
const JobDetailPage = lazy(() => import("../pages/JobDetailPage"));

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/jobs",
        element: (
          <Suspense fallback={<PageLoader />}>
            <JobsPage />
          </Suspense>
        ),
      },
      {
        path: "/jobs/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <JobDetailPage />
          </Suspense>
        ),
      }
    ],
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    ),
  },
]);
