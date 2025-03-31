import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { bookingVehicleAPI } from '../../../../features/booking/bookingAPI';

interface RouteData {
    name: string;
    bookings: number;
}

const PopularRoutesChart = () => {
    const { data: bookings } = bookingVehicleAPI.useGetBookingVehicleQuery();
    const [chartData, setChartData] = useState<RouteData[]>([]);

    useEffect(() => {
        if (bookings) {
            const routeCount = bookings.reduce((acc: { [key: string]: number }, booking) => {
                const route = `${booking.departure} → ${booking.destination}`;
                acc[route] = (acc[route] || 0) + 1;
                return acc;
            }, {});

            const data = Object.entries(routeCount)
                .map(([name, bookings]) => ({
                    name,
                    bookings
                }))
                .sort((a, b) => b.bookings - a.bookings)
                .slice(0, 10); // Show top 10 routes

            setChartData(data);
        }
    }, [bookings]);

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Top 10 Popular Routes</h2>
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
                                    name="Number of Bookings"
                                    fill="#4f46e5" 
                                    barSize={50} 
                                    radius={[4, 4, 0, 0]} 
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No route data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularRoutesChart;