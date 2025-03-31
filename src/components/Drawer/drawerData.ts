import { 
  BarChart, 
  UserCircle, 
  ClipboardList, 
  CalendarCheck, 
  Car, 
  Users, 
  Archive, 
  LogOut
} from "lucide-react";

export type DrawerData = {
    id: number;
    name: string;
    icon?: any;
    link: string;
    adminOnly: boolean;
};

export const drawerData: DrawerData[] = [
    {
        id: 1,
        name: 'Profile',
        icon: UserCircle,
        link: 'profile',
        adminOnly: false
    },
    {
        id: 2,
        name: 'Analytics',
        icon: BarChart,
        link: 'analytics',
        adminOnly: false
    },
    {
        id: 3,
        name: 'All Bookings',
        icon: ClipboardList,
        link: 'view_all_bookings',
        adminOnly: true
    },
    {
        id: 4,
        name: 'Book Now',
        icon: CalendarCheck,
        link: 'booking_form',
        adminOnly: false
    },
    {
        id: 5,
        name: 'My Bookings',
        icon: ClipboardList,
        link: 'my_bookings',
        adminOnly: false
    },
    {
        id: 6,
        name: 'Manage Vehicles',
        icon: Car,
        link: 'vehicles',
        adminOnly: true
    },
    {
        id: 7,
        name: 'Manage Users',
        icon: Users,
        link: 'users',
        adminOnly: true
    },
    {
        id: 8,
        name: 'Archived Bookings',
        icon: Archive,
        link: 'archived_bookings',
        adminOnly: true
    },
    {
        id: 9,
        name: 'Log Out',
        icon: LogOut,
        link: '#',
        adminOnly: false
    }
];
