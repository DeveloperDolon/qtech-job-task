import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <Navbar />
      </header>

      {/* Main Content */}
      <div className="bg-white max-w-[1500px] mx-auto min-h-[60vh]">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
