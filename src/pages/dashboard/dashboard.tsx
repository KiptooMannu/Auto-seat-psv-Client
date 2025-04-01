import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Drawer from "./aside/Drawer";
import ProtectedRoute from "../../pages/auth/Protectedroute";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProtectedRoute>
        {/* Mobile Toggle Button (fixed below navbar) */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="fixed top-20 left-4 z-50 block lg:hidden bg-blue-950 text-white p-2 rounded-md transition-all duration-300"
        >
          {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
          {/* Fixed Sidebar (Desktop) */}
          <div className="hidden lg:block fixed w-64 h-[calc(100vh-4rem)] bg-blue-950 z-40">
            <Drawer onToggle={() => setIsDrawerOpen(false)} />
          </div>

          {/* Mobile Sidebar (Overlay) */}
          <div
            className={`lg:hidden fixed w-64 h-[calc(100vh-4rem)] bg-blue-950 z-40 transform transition-transform duration-300 ${
              isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Drawer onToggle={() => setIsDrawerOpen(false)} />
          </div>

          {/* Overlay for mobile (click to close) */}
          {isDrawerOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Main Content (Offset for sidebar) */}
          <div className="flex-1 lg:ml-64 overflow-auto">
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
      <Footer />
    </div>
  );
};

export default Dashboard;
