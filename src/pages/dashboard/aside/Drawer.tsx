import { drawerData } from "../../../components/Drawer/drawerData";
import { LayoutDashboard, X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../../app/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

type DrawerData = {
  id: string | number;
  link: string;
  icon?: React.ElementType;
  name: string;
  adminOnly?: boolean;
};

function SideNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Close drawer when clicking outside
  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Handle window resize - keep drawer open on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogOut = () => {
    store.dispatch({ type: 'persist/PURGE', result: () => null, key: 'user-auth' });
    store.getState().user.token = null;
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Always visible on small screens */}
      <div className="fixed top-2 left-2 z-50 lg:hidden w-12 h-12">
        <button
          type="button"
          className="bg-blue-600 text-white p-3 rounded-lg shadow-xl border-2 border-white w-12 h-12 flex justify-center items-center"
          onClick={toggleDrawer}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleClickOutside}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-600 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-500">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="text-white" size={24} />
              <h5 className="text-white font-semibold text-lg">Dashboard</h5>
            </div>
            <button
              type="button"
              className="text-white hover:text-blue-200 lg:hidden"
              onClick={toggleDrawer}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {drawerData.filter(filterDrawerItems).map((item) => (
                <li key={item.id}>
                  {item.name === 'Log Out' ? (
                    <button
                      type="button"
                      onClick={handleLogOut}
                      className="w-full text-left text-white hover:bg-blue-700 block px-3 py-2 rounded-md transition-colors duration-200"
                    >
                      {item.icon && <item.icon className="inline-block mr-2" size={20} />}
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.link}
                      className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md transition-colors duration-200"
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="inline-block mr-2" size={20} />}
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Content Spacing for Desktop */}
      <div className="lg:ml-64 transition-all duration-300"></div>
    </>
  );
}

export default SideNav;
