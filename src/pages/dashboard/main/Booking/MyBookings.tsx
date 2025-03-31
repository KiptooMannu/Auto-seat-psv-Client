import { useGetUserBookingQuery, useDeleteBookingVehicleMutation } from "../../../../features/booking/bookingAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import jsPDF from "jspdf"; // Import jsPDF

function MyBookings() {
  const user = useSelector((state: RootState) => state.user);
  const userId = user.user?.user_id ?? 0;

  const { data: userBookings, error, isLoading, refetch } = useGetUserBookingQuery(userId);
  const [deleteBooking] = useDeleteBookingVehicleMutation();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState<number | null>(null); // Track which receipt is being downloaded

  const formatDate = (isoDate: string | number | Date | null | undefined) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? "Invalid Date" : format(date, "MM/dd/yyyy");
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
        try {
            setIsDeleting(bookingId);
            await deleteBooking(bookingId).unwrap();
            toast.success("Booking deleted successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to delete booking");
            console.error("Error:", error);
        } finally {
            setIsDeleting(null);
        }
    }
};

  const handleDownloadReceipt = async (booking: any) => {
    setIsDownloading(booking.booking_id); // Set loading state for this booking
    try {
      const doc = new jsPDF();

      // Set default font
      doc.setFont("helvetica"); // Use Helvetica as the default font
      doc.setFontSize(12); // Default font size for most text

      // Add company logo (Base64 encoded image)
      const logoBase64 = "data:image/jpeg;base64,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"; // Add your Base64-encoded image here
      const logoWidth = 30; // Decreased from 50
      const logoHeight = 30; // Decreased from 50
      doc.addImage(logoBase64, "PNG", 10, 10, logoWidth, logoHeight); // Adjusted size

      // Add header
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("PSV Booking System", 60, 20); // Adjusted position to avoid overlapping with the logo
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Contact: +254 700 000 000 | Email: support@psvbookings.com", 60, 30);

      // Add a line separator
      doc.setDrawColor(200);
      doc.line(10, 50, 200, 50); // Adjusted position to account for smaller logo

      // Add ticket title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Boarding Ticket", 10, 60);

      // Add passenger information (if available)
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Passenger: ${user.user?.first_name || "N/A"} ${user.user?.last_name || ""}`, 10, 70);
      doc.text(`Contact: ${user.user?.phone_number || "N/A"}`, 10, 80);

      // Add booking details
      doc.text(`Booking ID: ${booking.booking_id}`, 10, 90);
      doc.text(`Vehicle License Plate: ${booking.vehicle_id}`, 10, 100);
      doc.text(`Seat Numbers: ${booking.seat_ids || "N/A"}`, 10, 110);

      // Departure and Destination on separate lines
      doc.text(`Departure: ${booking.departure}`, 10, 120);
      doc.text(`Destination: ${booking.destination}`, 10, 130);

      doc.text(`Departure Date & Time: ${formatDate(booking.departure_date)} ${booking.departure_time || ""}`, 10, 140);

      // Add payment details
      doc.text(`Total Amount: KSh ${booking.total_price}`, 10, 150);
      doc.text(`Payment Method: ${booking.payment_method || "N/A"}`, 10, 160);
      doc.text(`Payment Status: ${booking.payment_status || "N/A"}`, 10, 170);
      doc.text(`M-Pesa Receipt: ${booking.mpesa_receipt_number || "N/A"}`, 10, 180);

      // Add rules and instructions
      doc.setFontSize(10);
      doc.text("Rules & Instructions:", 10, 190);
      doc.text("1. Arrive at the boarding point 20 minutes before departure.", 10, 195);
      doc.text("2. Present this ticket and a valid ID for verification.", 10, 200);
      doc.text("3. No changes to the booking are allowed after confirmation.", 10, 205);
      doc.text("4. Keep this ticket safe until the end of your journey.", 10, 210);

      // Save the PDF
      doc.save(`boarding_ticket_${booking.booking_id}.pdf`);
      toast.success("Boarding ticket downloaded successfully");
    } catch (error) {
      toast.error("Failed to generate boarding ticket");
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(null); // Reset loading state
    }
  };

  if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading bookings: {error.toString()}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Adjusted container to match footer margins */}
      <div className="container mx-auto px-4 bg-white rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-bold text-center text-black py-2 rounded-t-sm">
          My Booking History
        </h2>

        {!userBookings || userBookings.length === 0 ? (
          <div className="text-center text-gray-600 py-6">No bookings found</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Booking ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">License Plate</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Seat Numbers</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Booking Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Departure Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Total Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Booking Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Payment Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Payment Method</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">M-Pesa Receipt</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userBookings.map((booking) => (
                  <tr key={booking.booking_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-700">{booking.booking_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{booking.vehicle_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{booking.seat_ids}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatDate(booking.booking_date)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatDate(booking.departure_date)} {booking.departure_time && `at ${booking.departure_time}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">ksh{booking.total_price}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.booking_status === "confirmed" || booking.booking_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : booking.booking_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.payment_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : booking.payment_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.payment_status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.payment_method || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.mpesa_receipt_number || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteBooking(booking.booking_id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300 text-xs"
                          aria-label="Delete booking"
                          disabled={isDeleting === booking.booking_id}
                        >
                          {isDeleting === booking.booking_id ? "Deleting..." : "Delete"}
                        </button>
                        <button
                          onClick={() => handleDownloadReceipt(booking)}
                          className={`bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 text-xs relative group ${
                            booking.payment_status === "failed" || booking.payment_status === "pending" ? "cursor-not-allowed" : ""
                          }`}
                          aria-label="Download receipt"
                          disabled={isDownloading === booking.booking_id || booking.payment_status === "failed" || booking.payment_status === "pending"}
                          title={booking.payment_status === "failed" || booking.payment_status === "pending" ? "Ticket can only be downloaded after successful payment" : ""}
                        >
                          {isDownloading === booking.booking_id ? "Generating..." : "Download Ticket"}
                        </button>
                      </div>
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

export default MyBookings;