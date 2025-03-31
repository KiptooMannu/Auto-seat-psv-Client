import React, { useState } from "react";
import { useFetchCarSpecsQuery, Vehicle } from "../../../../features/vehicles/vehicleAPI";
import MapSeatModal from "./MapSeat";

const BookingForm: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [costRange, setCostRange] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isMapSeatModalOpen, setIsMapSeatModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const vehiclesPerPage = 6; // 3x2 layout

  const { data: vehicles, isLoading, isError, refetch } = useFetchCarSpecsQuery();

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const uniqueVehicles = vehicles
    ? Array.from(new Map(vehicles.map(vehicle => [vehicle.registration_number, vehicle])).values())
    : [];

  const filteredVehicles = uniqueVehicles.filter((vehicle) => {
    return (
      (vehicleType ? vehicle.vehicle_type === vehicleType : true) &&
      (departure ? vehicle.departure === departure : true) &&
      (destination ? vehicle.destination === destination : true) &&
      (departureTime ? vehicle.departure_time === departureTime : true) &&
      (costRange ? vehicle.cost >= Number(costRange.split('-')[0]) && vehicle.cost <= Number(costRange.split('-')[1]) : true)
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  // Get vehicles for the current page
  const displayedVehicles = filteredVehicles.slice(
    currentPage * vehiclesPerPage,
    (currentPage + 1) * vehiclesPerPage
  );

  const handleMapSeatModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsMapSeatModalOpen(true);
  };

  // Handler for departure time selection
  const handleDepartureTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartureTime(e.target.value);
    setVehicleType(""); // Clear vehicle type filter
    setDestination(""); // Clear destination filter
    setDeparture(""); // Clear departure filter
    setCostRange(""); // Clear cost range filter
  };

  // Handler for cost range selection
  const handleCostRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCostRange(e.target.value);
    setVehicleType(""); // Clear vehicle type filter
    setDestination(""); // Clear destination filter
    setDeparture(""); // Clear departure filter
    setDepartureTime(""); // Clear departure time filter
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading vehicles...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load vehicles. Please try again later.</p>;

  return (
    <div className="overflow-x-auto bg-gradient-to-r from-blue-50 via-blue-800 to-white min-h-screen w-full">
      <h1 className="text-xl font-bold text-webcolor text-center p-2">Book Now!!!</h1>

      {/* Filters Section - Full width, no padding */}
      <div className="w-full mx-0">
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-white p-2 rounded-lg shadow-md">
          <div>
            <label htmlFor="departure" className="block text-sm font-medium">Departure:</label>
            <select id="departure" value={departure} onChange={(e) => setDeparture(e.target.value)}
              className="select select-bordered w-full">
              <option value="">Select Departure</option>
              {Array.from(new Set(uniqueVehicles.map(vehicle => vehicle.departure))).map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium">Destination:</label>
            <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)}
              className="select select-bordered w-full">
              <option value="">Select Destination</option>
              {Array.from(new Set(uniqueVehicles.map(vehicle => vehicle.destination))).map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium">Vehicle Type:</label>
            <select id="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
              className="select select-bordered w-full">
              <option value="">Select Vehicle Type</option>
              {Array.from(new Set(uniqueVehicles.map(vehicle => vehicle.vehicle_type))).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="departureTime" className="block text-sm font-medium">Departure Time:</label>
            <select id="departureTime" value={departureTime} onChange={handleDepartureTimeChange}
              className="select select-bordered w-full">
              <option value="">Select Departure Time</option>
              {Array.from(new Set(uniqueVehicles.map(vehicle => vehicle.departure_time))).map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="costRange" className="block text-sm font-medium">Cost Range:</label>
            <select id="costRange" value={costRange} onChange={handleCostRangeChange}
              className="select select-bordered w-full">
              <option value="">All Prices</option>
              <option value="1000-2000">1000 - 2000</option>
              <option value="2000-3000">2000 - 3000</option>
              <option value="3000-4000">3000 - 4000</option>
              <option value="4000-5000">4000 - 5000</option>
            </select>
          </div>
        </form>
      </div>

      {/* Vehicle List - Full width, minimal padding */}
      <div className="w-full p-0 space-y-2">
        {filteredVehicles.length ? (
          <div className="flex flex-col items-center w-full px-0">
            {/* Pagination Arrows */}
            <div className="flex justify-between w-full px-2 mb-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="px-3 py-2 text-black bg-white font-bold rounded-full hover:bg-gray-300 disabled:opacity-50"
              >
                &larr;
              </button>
              <p className="text-white text-sm">Page {currentPage + 1} of {totalPages}</p>
              <button
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-2 text-black bg-white font-bold rounded-full hover:bg-gray-300 disabled:opacity-50"
              >
                &rarr;
              </button>
            </div>

            {/* Vehicle Grid - Full width, minimal gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
              {displayedVehicles.map((vehicle, index) => {
                const remainingSeats = Math.max((vehicle.capacity - 1) - (Number(vehicle.booked_Seats) || 0), 0);

                return (
                  <div
                    key={`${vehicle.registration_number}-${index}`}
                    className={`card bg-blue-200 shadow-md rounded-lg p-2 transform transition-all duration-300 hover:scale-105 ${
                      selectedVehicle?.registration_number === vehicle.registration_number
                        ? "border-2 border-webcolor"
                        : "border border-gray-200"
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <img src={vehicle.image_url} alt={vehicle.vehicle_name} className="w-full h-32 sm:h-24 object-cover rounded-lg" />
                    <div className="flex flex-col w-full">
                      <h3 className="text-sm font-semibold text-gray-800 mt-2">{vehicle.vehicle_name}</h3>
                      <p className="text-xs text-gray-700">{vehicle.vehicle_type} | {vehicle.capacity} Seats</p>
                      <p className="text-xs text-gray-700">Booked: {vehicle.booked_Seats || 0} | Remaining: {remainingSeats}</p>
                      <p className="text-xs text-gray-700">Reg No: {vehicle.registration_number}</p>
                      <p className="text-xs text-gray-700">License: {vehicle.license_plate}</p>
                      <p className="text-xs text-gray-700">From: {vehicle.departure} → To: {vehicle.destination}</p>
                      <p className="text-xs text-gray-700">
                        <strong>Departure Time: {vehicle.departure_time || "Not Available"}</strong>
                      </p>
                      <p className="text-xs text-gray-700"><strong>Cost: {vehicle.cost}</strong></p>
                      {/* Availability Tag */}
                      <div className={`text-xs font-extrabold mt-1 ${
                        remainingSeats > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {remainingSeats > 0 ? "Available" : "Unavailable"}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMapSeatModal(vehicle);
                        }}
                        className={`btn ${
                          remainingSeats > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                        } text-white border-none text-xs px-4 py-1 mt-1 w-full`}
                        disabled={remainingSeats === 0}
                      >
                        {remainingSeats > 0 ? "Select Seat" : "Fully Booked"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No vehicles match your search.</p>
        )}
      </div>

      {/* Modal */}
      {isMapSeatModalOpen && selectedVehicle && (
        <MapSeatModal
          vehicle={selectedVehicle}
          onClose={() => setIsMapSeatModalOpen(false)}
          refetchVehicles={refetch}
        />
      )}
    </div>
  );
};

export default BookingForm;
