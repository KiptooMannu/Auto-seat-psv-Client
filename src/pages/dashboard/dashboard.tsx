import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Drawer from "./aside/Drawer";
import ProtectedRoute from "../../pages/auth/Protectedroute";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <ProtectedRoute>
        <div className="flex flex-1">
          {/* Sidebar - Fixed width for desktop, hidden on mobile */}
          <aside className="hidden md:block w-64 min-h-[calc(100vh-4rem)] bg-blue-600 fixed top-16 left-0 z-20">
            <Drawer />
          </aside>

          {/* Main Content - Adjusts margin for sidebar on desktop */}
          <main className="flex-1 md:ml-64 mt-16">
            <div className="p-4 md:p-6">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
      <Footer />
    </div>
  );
};

export default Dashboard;
