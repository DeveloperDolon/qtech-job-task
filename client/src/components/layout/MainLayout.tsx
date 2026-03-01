import Navbar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navbar/>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;