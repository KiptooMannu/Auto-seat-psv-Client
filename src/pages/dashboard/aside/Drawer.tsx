import { drawerData } from "../../../components/Drawer/drawerData";
import { LayoutDashboard,
  //  ChevronsRight, ChevronsLeft,
    X } from "lucide-react";
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
    if (isOpen && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

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
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-blue-900 bg-opacity-30 z-30 lg:hidden"
          onClick={handleClickOutside}
        />
      )}

      {/* Mobile Menu Toggle Button - adjusted position */}
      <div className="fixed right-4 top-16 z-50 lg:hidden">
        <button
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          onClick={toggleDrawer}
          aria-label="Toggle Menu"
        >
          <LayoutDashboard size={24} />
        </button>
      </div>

      {/* Drawer */}
      <div 
        className={`fixed left-0 top-0 z-40 h-full w-1/2 lg:w-64 bg-blue-950 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
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
              className="text-white hover:text-blue-200 lg:hidden"
              onClick={toggleDrawer}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-3">
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
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="inline-block mr-3" size={24} />}
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
