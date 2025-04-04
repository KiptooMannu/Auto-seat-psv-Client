import { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { bookingVehicleAPI, Tbooking } from '../../../../features/booking/bookingAPI';

interface ChartData {
    name: string;
    bookings: number;
    monthOrder: number;
}

const BookingsPerMonth = () => {
    const { data: bookings } = bookingVehicleAPI.useGetBookingVehicleQuery();
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (bookings) {
            const bookingsByMonth = new Map<string, { count: number; monthOrder: number }>();
            
            const currentDate = new Date();
            const twelveMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);

            bookings.forEach((booking: Tbooking) => {
                const bookingDate = new Date(booking.booking_date);
                
                if (bookingDate >= twelveMonthsAgo) {
                    const monthYear = bookingDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short'
                    });
                    
                    const monthOrder = (bookingDate.getFullYear() * 100) + (bookingDate.getMonth() + 1);

                    if (!bookingsByMonth.has(monthYear)) {
                        bookingsByMonth.set(monthYear, { count: 1, monthOrder });
                    } else {
                        const current = bookingsByMonth.get(monthYear)!;
                        bookingsByMonth.set(monthYear, { 
                            count: current.count + 1,
                            monthOrder: current.monthOrder
                        });
                    }
                }
            });

            const data = Array.from(bookingsByMonth, ([name, { count, monthOrder }]) => ({
                name,
                bookings: count,
                monthOrder
            })).sort((a, b) => a.monthOrder - b.monthOrder);

            setChartData(data);
        }
    }, [bookings]);

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Seat Reservations Over Time</h2>
                {chartData.length > 0 ? (
                    <div className='w-full h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#6b7280" 
                                    tick={{ fontSize: 12 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis 
                                    stroke="#6b7280" 
                                    tick={{ fontSize: 12 }}
                                    allowDecimals={false}
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f3f4f6' }}
                                    formatter={(value: number) => [`${value} bookings`, 'Bookings']}
                                />
                                <Legend />
                                <Bar 
                                    dataKey="bookings" 
                                    name="Monthly Bookings"
                                    fill="#4f46e5" 
                                    barSize={50} 
                                    radius={[4, 4, 0, 0]} 
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No booking data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingsPerMonth;