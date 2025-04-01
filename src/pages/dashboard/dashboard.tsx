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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar (fixed at top) */}
      <Navbar />

      <ProtectedRoute>
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="fixed top-20 left-4 z-50 block lg:hidden bg-blue-950 text-white p-2 rounded-md transition-all duration-300"
        >
          {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Main Content Wrapper */}
        <div className="flex flex-1 pt-16">
          {/* Fixed Sidebar (Desktop) */}
          <div className="hidden lg:block fixed h-[calc(100vh-4rem-4rem)] w-64 bg-blue-950 z-40">
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

          {/* Overlay for Mobile */}
          {isDrawerOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Scrollable Content Area */}
          <div className="flex-1 lg:ml-64 overflow-y-auto pb-16">
            <div className="p-4 min-h-[calc(100vh-8rem)]">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="lg:ml-64 fixed bottom-0 w-full lg:w-[calc(100%-16rem)] bg-gray-800">
          <Footer />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
