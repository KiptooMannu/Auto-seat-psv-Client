import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/landingPage/HomePage';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/dashboard';
import Footer from './components/Footer/Footer';
import Profile from './pages/dashboard/main/Profile';
import BookingForm from './pages/dashboard/main/Booking/BookingForm';
import AllBookings from './pages/dashboard/main/Booking/AllBookings';
import MyBookings from './pages/dashboard/main/Booking/MyBookings';
import Tickets from './pages/dashboard/main/Tickets/MyTickets';
import VehiclesPage from './pages/dashboard/main/Vehicles/VehiclesPage';
import AllTickets from './pages/dashboard/main/Tickets/AllTickets';
import Analytics from './pages/dashboard/main/Analytics/Analytics';
import AboutSection from './components/About/About';
import Contact from './components/Contact/Contact';
import Testimonial from './components/Testimonial/Testimonial';
import Login from './pages/auth/Login';
import VerificationNotice from './pages/auth/VerificationNotice';
import VerifyAccountPage from './pages/auth/VerifyAccountPage';
import ArchivedBookings from './components/ArchivedBookings/ArchivedBookings';
import Users from './components/Users/Users';
import ForgotPassword from './pages/auth/Forgotpassword';

function App() {
  // Use HashRouter instead of BrowserRouter for GitHub Pages
  const router = createHashRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/navbar',
      element: <Navbar />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/footer',
      element: <Footer />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/verification-notice',
      element: <VerificationNotice />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/verify-account',
      element: <VerifyAccountPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
          <AboutSection />
          <Footer />
        </>
      ),
    },
    {
      path: '/testimonials',
      element: (
        <>
          <Navbar />
          <Testimonial />
          <Footer />
        </>
      ),
    },
    {
      path: '/contact',
      element: (
        <>
          <Navbar />
          <Contact />
          <Footer />
        </>
      ),
    },
    // DASHBOARD ROUTES
    {
      path: '/dashboard',
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'book_now',
          element: <Profile />,
        },
        {
          path: 'booking_form',
          element: <BookingForm />,
        },
        {
          path: 'view_all_bookings',
          element: <AllBookings />,
        },
        {
          path: 'my_bookings',
          element: <MyBookings />,
        },
        {
          path: 'vehicles',
          element: <VehiclesPage />,
        },
        {
          path: 'tickets',
          element: <Tickets ticket_id={6} />,
        },
        {
          path: 'all_tickets',
          element: <AllTickets />,
        },
        {
          path: 'analytics',
          element: <Analytics />,
        },
        {
          path: 'archived_bookings',
          element: <ArchivedBookings />,
        },
        {
          path: 'users',
          element: <Users />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
