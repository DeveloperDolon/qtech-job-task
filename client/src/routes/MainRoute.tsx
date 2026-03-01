import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        "path": "/",
        "element": <div className="text-2xl font-semibold">Home</div>
      }
    ],
  },
]);
