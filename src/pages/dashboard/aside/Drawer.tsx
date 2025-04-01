import { FC } from 'react';
import { drawerData } from "../../../components/Drawer/drawerData";
import { LayoutDashboard,
  //  ChevronsRight, ChevronsLeft,
    X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { logOut } from "../../../features/users/userSlice";

type DrawerData = {
  id: string | number;
  link: string;
  icon?: React.ElementType;
  name: string;
  adminOnly?: boolean;
};

interface DrawerProps {
  onToggle: () => void;
}

const Drawer: FC<DrawerProps> = ({ onToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  // Function to determine if user is admin
  const checkAdminStatus = () => {
    if (user.user?.role === 'admin') {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  // Function to filter drawer items based on user role
  const filterDrawerItems = (item: DrawerData): boolean => {
    if (isAdmin) {
      return true;
    } else {
      return !item.adminOnly;
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col text-white">
      {/* Drawer Header */}
      <div className="p-4 flex items-center justify-between border-b border-blue-800">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button 
          onClick={onToggle}
          className="lg:hidden p-2 hover:bg-blue-800 rounded-md transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Drawer Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="px-2 py-4 space-y-1 list-none">
          <li>
            <Link to="/dashboard" className="flex items-center px-4 py-3 text-white hover:bg-blue-800 rounded-md transition-colors">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* Add more menu items here */}
          {drawerData.filter(filterDrawerItems).map((item) => (
            <li key={item.id}>
              {item.name === 'Log Out' ? (
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="w-full text-left text-white hover:bg-blue-700 block px-4 py-3 rounded-md transition-colors duration-200 text-base lg:text-sm"
                >
                  {item.icon && <item.icon className="inline-block mr-3" size={24} />}
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.link}
                  className="text-white hover:bg-blue-700 block px-4 py-3 rounded-md transition-colors duration-200 text-base lg:text-sm"
                >
                  {item.icon && <item.icon className="inline-block mr-3" size={24} />}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Drawer;
