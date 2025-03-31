import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetArchivedBookingsQuery,
  useDeleteArchivedBookingMutation,
} from "../../features/booking/bookingAPI"; // Update the import path

// Define the type for an archived booking
interface ArchivedBooking {
  archive_id: number;
  booking_id: number;
  user_id: number;
  vehicle_id: string;
  departure: string;
  destination: string;
  departure_date: string; // or Date
  price: number;
  total_price: number;
  booking_status: string;
  archived_by: number;
  archived_at: string; // or Date
  payment_status: string; // Add payment_status
  archived_by_first_name?: string; // Add first name of the user who archived the booking
}

function Archived() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetArchivedBookingsQuery();
  const [deleteArchivedBooking] = useDeleteArchivedBookingMutation();

  // Extract archivedBookings from the response
  const archivedBookings = response?.data || [];

  // Delete an archived booking by booking_id
const handleDeleteArchivedBooking = async (bookingId: number) => {
  if (window.confirm("Are you sure you want to delete this archived booking?")) {
    try {
      await deleteArchivedBooking(bookingId).unwrap();
      toast.success("Archived booking deleted successfully.");
      refetch(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete archived booking.");
    }
  }
};


  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while fetching archived bookings.");
    }
  }, [isError]);

  // Function to get status color
  const getStatusColor = (status: string | undefined | null) => {
    if (!status) {
      return "bg-gray-100 text-gray-800"; // Default color for undefined or null status
    }
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2 sm:p-4 lg:p-8">
      <ToastContainer />
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 py-4 sm:py-6 bg-gray-100">
          Archived Bookings
        </h2>

        {isLoading ? (
          <div className="text-center text-yellow-400 py-8">Loading...</div>
        ) : archivedBookings.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No archived bookings found.</div>
        ) : (
          <div className="overflow-x-auto relative">
            {/* Scroll indicator for mobile */}
            <div className="lg:hidden text-sm text-gray-500 text-center py-2">
              Scroll horizontally to view more →
            </div>
            
            <table className="w-full bg-white table-auto">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="sticky left-0 bg-gray-800 px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">User ID</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">From → To</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Departure Date</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Price</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Payment</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Archived By</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase whitespace-nowrap">Archived At</th>
                  <th className="sticky right-0 bg-gray-800 px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {archivedBookings.map((booking: ArchivedBooking) => (
                  <tr key={booking.archive_id} className="hover:bg-gray-50 transition-colors">
                    <td className="sticky left-0 bg-white px-4 py-3 text-xs sm:text-sm text-gray-700">{booking.archive_id}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{booking.booking_id}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{booking.user_id}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{booking.vehicle_id}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {booking.departure} → {booking.destination}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {new Date(booking.departure_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      KSh {booking.total_price}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.booking_status)}`}>
                        {booking.booking_status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.payment_status)}`}>
                        {booking.payment_status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {booking.archived_by_first_name || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {new Date(booking.archived_at).toLocaleDateString()}
                    </td>
                    <td className="sticky right-0 bg-white px-4 py-3 text-xs sm:text-sm">
                      <button
                        onClick={() => handleDeleteArchivedBooking(booking.booking_id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 
                        transition-colors text-xs sm:text-sm whitespace-nowrap
                        hover:shadow-md active:transform active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Archived;
