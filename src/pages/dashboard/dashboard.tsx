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
        <div className="flex flex-row flex-grow">
          <div className="hidden md:block min-w-fit">
            <Drawer />
          </div>
          <div className="flex flex-col flex-grow p-6 bg-white rounded-lg shadow-sm m-4">
            <div className="bg-white rounded-lg p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </ProtectedRoute>
      <Footer />
    </div>
  );
};

export default Dashboard;