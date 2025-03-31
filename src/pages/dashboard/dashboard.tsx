import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Drawer from "./aside/Drawer";
import ProtectedRoute from "../../pages/auth/Protectedroute";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProtectedRoute>
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]"> {/* Adjusted for navbar height */}
          {/* Sidebar - hidden on mobile, fixed width on desktop */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0 bg-blue-950">
            <div className="fixed w-64">
              <Drawer />
            </div>
          </div>
          
          {/* Mobile Drawer - will be handled by the Drawer component */}
          <div className="lg:hidden">
            <Drawer />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 min-w-0 w-full lg:max-w-[calc(100vw-16rem)]"> {/* Adjusted max width accounting for sidebar */}
            <div className="p-2 sm:p-3 lg:p-4">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="max-w-full overflow-x-auto">
                  <div className="p-2 sm:p-3 lg:p-4">
                    <Outlet />
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
