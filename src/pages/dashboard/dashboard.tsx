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
        <div className="pt-16">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="fixed top-20 left-4 z-50 block lg:hidden bg-blue-950 text-white p-2 rounded-md transition-all duration-300"
          >
            {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className="flex flex-row min-h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className="fixed lg:relative w-64 flex-shrink-0 z-40">
              <div 
                className={`w-64 h-[calc(100vh-4rem)] bg-blue-950 transform transition-transform duration-300 ${
                  isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
              >
                <Drawer onToggle={() => setIsDrawerOpen(!isDrawerOpen)} />
              </div>
            </div>
            
            {/* Overlay for mobile */}
            {isDrawerOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={() => setIsDrawerOpen(false)}
              />
            )}
            
            {/* Main content area */}
            <div className="flex-1 min-w-0 w-full lg:pl-0">
              <div className="p-2 sm:p-3 lg:p-4">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="overflow-hidden">
                    <div className="p-2 sm:p-3 lg:p-4">
                      <div className="overflow-x-auto">
                        <div className="min-w-max">
                          <Outlet />
                        </div>
                      </div>
                    </div>
                  </div>
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
