import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../store/slice/authSlice";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="transparent sticky top-0 z-50">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-brand-dark font-bold text-lg font-epilogue">
              QuickHire
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/jobs"
              className="text-brand-gray hover:text-brand-dark font-medium text-sm transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              to="/jobs"
              className="text-brand-gray hover:text-brand-dark font-medium text-sm transition-colors"
            >
              Browse Companies
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/admin/login"
                  className="text-brand-dark font-semibold text-sm border border-brand-lightgray px-5 py-2 rounded-md hover:border-primary hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/admin/login"
                  className="bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-brand-dark"></span>
              <span className="block w-6 h-0.5 bg-brand-dark"></span>
              <span className="block w-6 h-0.5 bg-brand-dark"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Link
                to="/jobs"
                onClick={() => setMenuOpen(false)}
                className="text-brand-gray font-medium py-2 hover:text-brand-dark"
              >
                Find Jobs
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-primary font-semibold py-2"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-brand-dark font-semibold border border-brand-lightgray px-5 py-2 rounded-md text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
