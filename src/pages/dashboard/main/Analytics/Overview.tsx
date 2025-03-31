import { usersAPI } from "../../../../features/users/usersAPI";
import { bookingVehicleAPI } from "../../../../features/booking/bookingAPI";
import { useEffect, useState } from "react";

const Overview = () => {
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery();
  const { data: bookingsData, isLoading: bookingsLoading, error: bookingsError } = bookingVehicleAPI.useGetBookingVehicleQuery();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);

  useEffect(() => {
    if (usersData && bookingsData) {
      // Calculate total users
      const usersCount = usersData.length;

      // Calculate total bookings and revenue
      const bookingsCount = bookingsData.length;
      const completedCount = bookingsData.filter(booking => booking.payment_status === 'completed').length;
      const totalRevenueAmount = bookingsData
        .filter(booking => booking.payment_status === 'completed')
        .reduce((sum, booking) => sum + (Number(booking.total_price) || 0), 0);

      // Animation for counting numbers
      const duration = 1000;
      const steps = 30;
      const usersStep = usersCount / steps;
      const bookingsStep = bookingsCount / steps;
      const completedStep = completedCount / steps;
      const revenueStep = totalRevenueAmount / steps;

      let currentUsers = 0;
      let currentBookings = 0;
      let currentCompleted = 0;
      let currentRevenue = 0;

      const interval = setInterval(() => {
        currentUsers = Math.min(currentUsers + usersStep, usersCount);
        currentBookings = Math.min(currentBookings + bookingsStep, bookingsCount);
        currentCompleted = Math.min(currentCompleted + completedStep, completedCount);
        currentRevenue = Math.min(currentRevenue + revenueStep, totalRevenueAmount);

        setTotalUsers(Math.floor(currentUsers));
        setTotalBookings(Math.floor(currentBookings));
        setCompletedBookings(Math.floor(currentCompleted));
        setTotalRevenue(Math.floor(currentRevenue));

        if (
          currentUsers >= usersCount &&
          currentBookings >= bookingsCount &&
          currentCompleted >= completedCount &&
          currentRevenue >= totalRevenueAmount
        ) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [usersData, bookingsData]);

  if (usersLoading || bookingsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (usersError || bookingsError) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Users */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
        <div className="text-4xl font-bold text-blue-600">{totalUsers}</div>
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mt-2">
          👤
        </div>
      </div>

      {/* Total Bookings */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
        <div className="text-4xl font-bold text-green-600">{totalBookings}</div>
        <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mt-2">
          📅
        </div>
      </div>

      {/* Completed Bookings */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-700">Completed Bookings</h3>
        <div className="text-4xl font-bold text-purple-600">{completedBookings}</div>
        <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center mt-2">
          ✅
        </div>
      </div>

      {/* Revenue Generated */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-700">Revenue Generated</h3>
        <div className="text-4xl font-bold text-yellow-600">
          KSh {totalRevenue.toLocaleString()}
        </div>
        <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center mt-2">
          💰
        </div>
      </div>
    </div>
  );
};

export default Overview;
