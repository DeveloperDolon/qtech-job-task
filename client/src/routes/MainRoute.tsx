import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // 🌍 Public Routes
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/property/:id", element: <PropertyDetails /> },
    ],
  },
]);