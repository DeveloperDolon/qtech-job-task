import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { lazy, Suspense } from "react";
import { PageLoader } from "../components/shared";

const AdminLoginPage = lazy(() => import("../pages/AdminLoginPage"));

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div className="text-2xl font-semibold">Home</div>,
      },
      {
        path: "/admin/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);
